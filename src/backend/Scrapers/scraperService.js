import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
puppeteer.use(StealthPlugin());

import moment from "moment";
import pool from "../Database/db_setup.js";
import linkedInScraper from "./LinkedIn_Scraper.js";
import naukriScraper from "./Naukri_Scraper.js";
import indeedScraper from "./Indeed_Scraper.js";
import internshalaScraper from "./Internshala_Scraper.js";
import { filterRelevantJobs } from "../utils/relevanceFilter.js";

const scrapeDate = moment().utc().format("YYYY-MM-DD");

/**
 * Upsert jobs into job_scrape_results (JSONB) AND job_seen_index (dedup table)
 */
const storeResults = async (jobId, jobs) => {
  if (!jobs || jobs.length === 0) return;

  // ── 1. Upsert into JSONB results table ──────────────────────────
  const upsertResultsQuery = `
    INSERT INTO public.job_scrape_results (job_id, jobs_by_date)
    VALUES ($1, jsonb_build_object($2::text, $3::jsonb))
    ON CONFLICT (job_id)
    DO UPDATE SET
      jobs_by_date = public.job_scrape_results.jobs_by_date ||
                     jsonb_build_object($2::text, $3::jsonb),
      updated_at = NOW();
  `;

  await pool.query(upsertResultsQuery, [
    jobId,
    scrapeDate,
    JSON.stringify(jobs),
  ]);

  // ── 2. Upsert each job into dedup index ──────────────────────────
  const upsertIndexQuery = `
    INSERT INTO public.job_seen_index
      (platform_job_id, job_id, source, title, company, location, url, first_seen, last_seen, seen_count, is_active)
    VALUES ($1, $2, $3, $4, $5, $6, $7, NOW(), NOW(), 1, true)
    ON CONFLICT (platform_job_id)
    DO UPDATE SET
      last_seen = NOW(),
      seen_count = public.job_seen_index.seen_count + 1,
      is_active = true,
      url = EXCLUDED.url;
  `;

  for (const job of jobs) {
    await pool.query(upsertIndexQuery, [
      job.job_id, // platform_job_id e.g. LNKD-123456
      jobId, // user's job requirement id
      job.source,
      job.job_title,
      job.job_provider,
      job.job_location,
      job.job_URL,
    ]);
  }
};

/**
 * Merge platform results into per-job buckets
 * platformResults = { job_id_1: [...jobs], job_id_2: [...jobs] }
 */
const mergeResults = (allResults, platformResults) => {
  for (const [jobId, jobs] of Object.entries(platformResults)) {
    if (!allResults[jobId]) allResults[jobId] = [];
    allResults[jobId].push(...jobs);
  }
};

/**
 * Main scrape function — Platform First Architecture
 * Fetches ALL job requirements, runs each platform once for all requirements
 */
const scrapeJobs = async () => {
  try {
    console.log(`🔍 [Orchestrator] Starting scrape run for ${scrapeDate}`);

    // ── 1. Fetch ALL active job requirements ────────────────────────
    const { rows: allRequirements } = await pool.query(
      "SELECT * FROM public.job_requirements",
    );

    if (allRequirements.length === 0) {
      console.log("⚠️  No job requirements found");
      return { success: true, totalJobs: 0 };
    }

    console.log(
      `📋 [Orchestrator] Found ${allRequirements.length} job requirements`,
    );

    // ── 2. Launch single browser for entire run ─────────────────────
    const browser = await puppeteer.launch({
      headless: false,
      userDataDir: "user",
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage",
        "--disable-gpu",
      ],
    });

    console.log("🌍 [Orchestrator] Browser started");

    const allResults = {}; // { job_id: [...jobs] }

    // ── 3. LinkedIn — DISABLED (reCAPTCHA issues) ──────────────────
    // Uncomment below to re-enable LinkedIn scraping
    // try {
    //   const linkedInResults = await linkedInScraper(browser, allRequirements);
    //   mergeResults(allResults, linkedInResults);
    //   console.log(`✅ [LinkedIn] Done`);
    // } catch (e) {
    //   console.error("❌ [LinkedIn] Scraper failed:", e.message);
    // }
    console.log("⏭️  [LinkedIn] Skipped (disabled)");

    // ── 4. Indeed — one session, all requirements ───────────────────
    try {
      const indeedResults = await indeedScraper(browser, allRequirements);
      mergeResults(allResults, indeedResults);
      console.log(`✅ [Indeed] Done`);
    } catch (e) {
      console.error("❌ [Indeed] Scraper failed:", e.message);
    }

    // ── 5. Naukri — one session, all requirements ───────────────────
    try {
      const naukriResults = await naukriScraper(browser, allRequirements);
      mergeResults(allResults, naukriResults);
      console.log(`✅ [Naukri] Done`);
    } catch (e) {
      console.error("❌ [Naukri] Scraper failed:", e.message);
    }

    // ── 6. Internshala — only for requirements with will_intern ─────
    const internRequirements = allRequirements.filter((r) => r.will_intern);
    if (internRequirements.length > 0) {
      try {
        const internshalaResults = await internshalaScraper(
          browser,
          internRequirements,
        );
        mergeResults(allResults, internshalaResults);
        console.log(`✅ [Internshala] Done`);
      } catch (e) {
        console.error("❌ [Internshala] Scraper failed:", e.message);
      }
    }

    // ── 7. Close browser ────────────────────────────────────────────
    await browser.close();
    console.log("✅ [Orchestrator] Browser closed");

    // ── 8. Filter (Groq AI) + Dedup + Store ───────────────────────
    let totalJobs = 0;
    for (const req of allRequirements) {
      const jobId = req.job_id;
      const rawJobs = allResults[jobId] || [];

      // Stage 1: AI relevance filter — sequential to respect Groq rate limits
      const relevantJobs = await filterRelevantJobs(rawJobs, req);
      console.log(
        `[Filter] ${jobId}: ${rawJobs.length} scraped → ${relevantJobs.length} relevant`,
      );

      // Stage 2: Dedup — remove jobs already seen today via job_seen_index
      const newJobs = [];
      for (const job of relevantJobs) {
        const { rows } = await pool.query(
          `SELECT 1 FROM public.job_seen_index WHERE platform_job_id = $1 AND last_seen::date = CURRENT_DATE`,
          [job.job_id],
        );
        if (rows.length === 0) newJobs.push(job); // not seen today — keep it
      }
      console.log(`[Dedup]  ${jobId}: ${newJobs.length} new jobs after dedup`);

      // Stage 3: Save to DB
      await storeResults(jobId, newJobs);
      totalJobs += newJobs.length;
    }

    console.log(
      `🎉 [Orchestrator] Done — ${totalJobs} total jobs stored for ${scrapeDate}`,
    );

    return { success: true, scrapeDate, totalJobs };
  } catch (error) {
    console.error("❌ [Orchestrator] Fatal error:", error);
    return { success: false, error: error.message };
  }
};

export default scrapeJobs;
