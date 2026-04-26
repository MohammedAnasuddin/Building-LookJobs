import puppeteer from "puppeteer-extra";
import pool from "../db/db_setup.js";

import { runPlatformScraping } from "./coreEngine.js";
import { filterRelevantJobs } from "../utils/relevanceFilter.js";
import { storeResults } from "../services/jobStorage.service.js";

export async function runScrapeBatch() {
  console.log("🚀 [Batch] Starting");

  try {
    // 🔹 1. Fetch all job requirements
    const { rows: allRequirements } = await pool.query(
      "SELECT * FROM job_requirements",
    );

    if (allRequirements.length === 0) {
      console.log("⚠️ No job requirements found");
      return { success: true, totalJobs: 0 };
    }

    console.log(`📋 Found ${allRequirements.length} job requirements`);

    // 🔹 2. Launch browser (single instance)
    const browser = await puppeteer.launch({
      headless: false,
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage",
      ],
    });

    console.log("🌍 Browser started");

    // 🔹 3. Run platform scraping (core engine)
    const results = await runPlatformScraping(browser, allRequirements);

    // 🔹 4. Close browser early (important)
    await browser.close();
    console.log("🔒 Browser closed");

    // 🔹 5. Process results per job
    let totalJobs = 0;

    for (const req of allRequirements) {
      const jobId = req.job_id;

      try {
        const rawJobs = results[jobId] || [];

        console.log(`📊 ${jobId}: ${rawJobs.length} scraped`);

        // ✅ Step 1 — AI relevance filter
        const relevantJobs = await filterRelevantJobs(rawJobs, req);

        console.log(`🧠 ${jobId}: ${relevantJobs.length} relevant`);

        if (relevantJobs.length === 0) continue;

        // ✅ Step 2 — BULK DEDUP (optimized)
        const jobIds = relevantJobs.map((job) => job.job_id);

        const { rows } = await pool.query(
          `
          SELECT platform_job_id 
          FROM public.job_seen_index
          WHERE platform_job_id = ANY($1)
            AND last_seen::date = CURRENT_DATE
          `,
          [jobIds],
        );

        const seenSet = new Set(rows.map((r) => r.platform_job_id));

        const newJobs = relevantJobs.filter((job) => !seenSet.has(job.job_id));

        console.log(`🧹 ${jobId}: ${newJobs.length} after dedup`);

        if (newJobs.length === 0) continue;

        // ✅ Step 3 — Store results
        await storeResults(jobId, newJobs);

        totalJobs += newJobs.length;
      } catch (err) {
        console.error(`❌ Failed processing job ${jobId}:`, err.message);
      }
    }

    console.log(`🎉 [Batch] Done — ${totalJobs} total jobs stored`);

    return { success: true, totalJobs };
  } catch (err) {
    console.error("❌ [Batch] Fatal error:", err.message);
    return { success: false, error: err.message };
  }
}
