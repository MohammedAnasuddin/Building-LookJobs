import puppeteer from 'puppeteer-extra';
import StealthPlugin from "puppeteer-extra-plugin-stealth";
puppeteer.use(StealthPlugin());
import moment from "moment";
import pool from "../Database/db_setup.js"; 
import linkedInScraper from './LinkedIn_Scraper.js'

const scrapeJobs = async (job_id) => {
  try {
    console.log(`🔍 Starting job scraping for job_id: ${job_id}`);

    // 1️⃣ Get Job Requirements from DB
    const jobQuery = "SELECT * FROM job_requirements WHERE job_id = $1";
    const { rows } = await pool.query(jobQuery, [job_id]);

    if (rows.length === 0) {
      throw new Error(`❌ No job requirements found for job_id: ${job_id}`);
    }

    const jobRequirements = rows[0];
    console.log("📄 Job Requirements Retrieved:", jobRequirements);

    // 2️⃣ Launch Puppeteer with Pre-Saved User Data
    const USER_DATA_DIR = "user";
    const browser = await puppeteer.launch({
      headless: false, // Set to true for production (false for debugging)
      userDataDir: USER_DATA_DIR, // Pre-saved user directory
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage",
        "--disable-gpu",
      ],
    });

    console.log("🌍 Puppeteer browser started with user data...");

    // 3️⃣ Pass requirements to scraper functions
    const allJobResults = []; // ✅ Array to store results from all scrapers

    const linkedInResults = await linkedInScraper(browser, jobRequirements);
    allJobResults.push(...linkedInResults); // ✅ Add LinkedIn results
    
    // const indeedResults = await indeedScraper(browser, jobRequirements);
    // allJobResults.push(...indeedResults); // ✅ Add Indeed results
    
   


    const timestamp = moment().format("DD-MMM-YYYY HH:mm:ss");
    // 4️⃣ Close Puppeteer
    await browser.close();
    console.log("✅ Puppeteer browser closed...");

    // 5️⃣ Create Daily Update Object with timestamp
    const dailyUpdate = {
      date: timestamp,
      jobs: allJobResults, // ✅ Store all jobs from all scrapers
    };
    
    console.log("📌 Daily Update Object:", dailyUpdate);
    
    // ✅ Insert into `job_updates` table
    const updateQuery = `
      UPDATE job_updates
      SET updates = array_append(updates, $1::jsonb)
      WHERE job_id = $2
    `;
    
    await pool.query(updateQuery, [JSON.stringify(dailyUpdate), job_id]);

    console.log("✅ Job scraping results saved successfully for:", job_id);
    return { success: true, job_id };
  } catch (error) {
    console.error("❌ Error in scrapeJobs:", error);
    return { success: false, error: error.message };
  }
};

export default scrapeJobs;