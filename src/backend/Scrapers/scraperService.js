import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
puppeteer.use(StealthPlugin());

import moment from "moment";
import pool from "../Database/db_setup.js";

import linkedInScraper from "./LinkedIn_Scraper.js";
import naukriScraper from "./Naukri_Scraper.js";
import indeedScraper from "./Indeed_Scraper.js";
import internshalaScraper from "./Internshala_Scraper.js";

const scrapeJobs = async (job_id) => {
  try {
    console.log(`🔍 Starting job scraping for job_id: ${job_id}`);

    // 🔹 Scrape date (used as JSON key)
    const scrapeDate = moment().format("YYYY-MM-DD");

    // 1️⃣ Fetch job requirements
    const jobQuery = "SELECT * FROM public.job_requirements WHERE job_id = $1";

    const { rows } = await pool.query(jobQuery, [job_id]);

    if (rows.length === 0) {
      throw new Error(`❌ No job requirements found for job_id: ${job_id}`);
    }

    const jobRequirements = rows[0];
    console.log("📄 Job Requirements Retrieved:", jobRequirements);

    // 2️⃣ Launch Puppeteer
    const browser = await puppeteer.launch({
      headless: false, // true in production
      userDataDir: "user",
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage",
        "--disable-gpu",
      ],
    });

    console.log("🌍 Puppeteer browser started...");

    // 3️⃣ Run scrapers
    let allJobResults = [];

    try {
      const linkedInResults = await linkedInScraper(browser, jobRequirements);
      allJobResults.push(...linkedInResults);
      console.log(`✅ LinkedIn: ${linkedInResults.length} jobs`);
    } catch (e) {
      console.error("❌ LinkedIn scraper failed:", e.message);
    }

    try {
      const naukriResults = await naukriScraper(browser, jobRequirements);
      allJobResults.push(...naukriResults);
      console.log(`✅ Naukri: ${naukriResults.length} jobs`);
    } catch (e) {
      console.error("❌ Naukri scraper failed:", e.message);
    }

    try {
      const indeedResults = await indeedScraper(browser, jobRequirements);
      allJobResults.push(...indeedResults);
      console.log(`✅ Indeed: ${indeedResults.length} jobs`);
    } catch (e) {
      console.error("❌ Indeed scraper failed:", e.message);
    }

    try {
      const internshalaResults = await internshalaScraper(
        browser,
        jobRequirements
      );
      allJobResults.push(...internshalaResults);
      console.log(`✅ Internshala: ${internshalaResults.length} jobs`);
    } catch (e) {
      console.error("❌ Internshala scraper failed:", e.message);
    }

    // 4️⃣ Close browser
    await browser.close();
    console.log("✅ Puppeteer browser closed");

    // 5️⃣ Store results in NEW table
    // const scrapeDate = moment().format("YYYY-MM-DD");

    console.log(
      `[DB] Storing ${allJobResults.length} jobs for ${job_id} on ${scrapeDate}`
    );

    const upsertQuery = `
  INSERT INTO public.job_scrape_results (job_id, jobs_by_date)
  VALUES (
    $1,
    jsonb_build_object($2::text, $3::jsonb)
  )
  ON CONFLICT (job_id)
  DO UPDATE SET
    jobs_by_date =
      public.job_scrape_results.jobs_by_date ||
      jsonb_build_object($2::text, $3::jsonb),
    updated_at = NOW();
`;

    await pool.query(upsertQuery, [
      job_id,
      scrapeDate,
      JSON.stringify(allJobResults),
    ]);

    return {
      success: true,
      job_id,
      scrapeDate,
      totalJobs: allJobResults.length,
    };
  } catch (error) {
    console.error("❌ Error in scrapeJobs:", error);
    return { success: false, error: error.message };
  }
};

export default scrapeJobs;
