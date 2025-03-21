import cron from "node-cron";
import pool  from "../Database/db_setup.js"; // PostgreSQL connection
import scrapeJobs from "../Scrapers/scraperService.js"; // Scraper function

const CRON_SCHEDULE = "*/5 * * * * *"; // Runs every 5 minutes

// **Main function: Scrape jobs for user_id = 0**
const scrapeJobsForUser = async () => {
  const user_id = 0; // 🔥 Hardcoded User ID

  console.log(`🚀 Starting job scraping for user: ${user_id}`);

  try {
    // **Step 1: Fetch JID Array for user 0**
    const { rows } = await pool.query(
      'SELECT jid_array FROM users WHERE user_id = $1',
      [user_id]
    );
    const jidArray = rows[0]?.jid_array || [];  // Default to an empty array if null
    
    console.log("Fetched JID Array:", jidArray);

    // **Step 2: Call scrapingServices for each JID**
    console.log("📌 Total Jobs to Scrape:", jidArray.length);
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    for (const job_id of jidArray) {
      if (!job_id) {
        console.error("⚠️ Skipping invalid job_id:", job_id);
        continue; // Skip this iteration if job_id is invalid
      }
    
      console.log(`🔍 Calling scrapingServices for JID: ${job_id}`);
      await scrapeJobs(job_id); // Wait for this job to complete before starting the next one
      console.log(`✅ Finished scraping for JID: ${job_id}`);
      delay(5000)
    }
    
    console.log("🎯 All jobs scraped successfully!");
  } catch (error) {
    console.error("❌ Error in scrapeJobsForUser:", error);
  }
};

// **CRON JOB (Runs every 30 sec)**
cron.schedule(CRON_SCHEDULE, scrapeJobsForUser);

console.log("🕒 CRON Job Scheduled: Every 5 minutes");
