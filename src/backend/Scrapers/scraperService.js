import puppeteer from 'puppeteer-extra';
import StealthPlugin from "puppeteer-extra-plugin-stealth";
puppeteer.use(StealthPlugin());
import moment from "moment";
import pool from "../Database/db_setup.js"; 

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
    const browser = await puppeteer.launch({
      headless: false, // Set to true for production (false for debugging)
      userDataDir: "./scraper_user", // Pre-saved user directory
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage",
        "--disable-gpu",
      ],
    });

    console.log("🌍 Puppeteer browser started with user data...");

    // 3️⃣ Pass requirements to scraper functions
    const jobResults = await scrapeWithRequirements(browser, jobRequirements);

    // 4️⃣ Close Puppeteer
    await browser.close();
    console.log("✅ Puppeteer browser closed...");

    // 5️⃣ Create Daily Update Object with timestamp
    const timestamp = moment().format("DD-MMM-YYYY HH:mm:ss");
    const dailyUpdate = {
      date: timestamp,
      jobs: jobResults, // Store the scraped job data
    };

    console.log("📌 Daily Update Object:", dailyUpdate);

    // 6️⃣ Insert into job_updates
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

// // 🚀 Mock Scraper Function (Replace with actual scraping logic)
const scrapeWithRequirements = async (browser, jobRequirements) => {
//   const page = await browser.newPage();
//   await page.goto("https://example.com"); // Modify with actual job site
//   console.log("🌐 Navigating to job site...");

  // Simulate scraping process
  await new Promise((r) => setTimeout(r, 2000)); // Fake delay for scraping

  return [
    { title: "Software Engineer", location: jobRequirements.location, company: "Google" },
    { title: "Frontend Developer", location: jobRequirements.location, company: "Microsoft" },
  ];
};

export default scrapeJobs;