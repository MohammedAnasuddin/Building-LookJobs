import cron from "node-cron";
import pool from "../Database/db_setup.js";
import scrapeJobs from "../Scrapers/scraperService.js";

const CRON_SCHEDULE = process.env.JOB_SCRAPE_CRON || "0 */1 * * *";

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

export async function runScrapeCycle(source = "CRON") {
  console.log(
    `🚀 ${source}: Job scraping started at`,
    new Date().toISOString()
  );

  const { rows } = await pool.query(`
    SELECT job_id FROM job_requirements
  `);

  // for (const { job_id } of rows) {
  //   console.log(`🔍 Scraping job_id: ${job_id}`);
  //   await scrapeJobs(job_id);
  //   await delay(3000);
  // }

  console.log(`✅ ${source}: Job scraping completed`);
}

// Real cron
cron.schedule(CRON_SCHEDULE, () => runScrapeCycle("CRON"));

console.log("🕒 Cron scheduled:", CRON_SCHEDULE);
