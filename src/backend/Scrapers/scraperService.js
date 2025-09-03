import puppeteer from 'puppeteer-extra';
import StealthPlugin from "puppeteer-extra-plugin-stealth";
puppeteer.use(StealthPlugin());
import moment from "moment";
import pool from "../Database/db_setup.js"; 
import linkedInScraper from './LinkedIn_Scraper.js'
import indeedScraper from './Indeed_Scraper.js';

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
    const allJobResults = [
      {
        "job_id": "4190444401",
        "OpportunityID": "OPP-69743",
        "added_on": "2025-03-21",
        "job_title": "Full Stack Web Developer Intern",
        "job_provider": "WebBoost Solutions by UM",
        "job_location": "India (Remote)",
        "job_URL": "https://www.linkedin.com/jobs/view/4190444401/?eBP=BUDGET_EXHAUSTED_JOB&refId=GYIQJJvOMei%2Bi5akGkRVfA%3D%3D&trackingId=1q4T4Eqmupr86RnWxAPBMw%3D%3D&trk=flagship3_search_srp_jobs",
        "Remote": true,
        "Internship": false,
        "Fresher": false,
        "isNew": true
      },
      {
        "job_id": "4188321734",
        "OpportunityID": "OPP-10259",
        "added_on": "2025-03-21",
        "job_title": "Full Stack MERN Developer",
        "job_provider": "AccioJob",
        "job_location": "Noida, Uttar Pradesh, India (On-site)",
        "job_URL": "https://www.linkedin.com/jobs/view/4188321734/?eBP=CwEAAAGVunarZl-NtJRtWDoPHC4PMkbIB7QZhFRqra1HlMonjz_812QlUrT4o5CXgbguu-sDh2uH7uGIDZnkFGMmVnbyvbh8110gQkLTGpX_U8eOhKvcrNQlOxAg1rmQaJK1IRH-PGQk_M-HRjPB6ESEmFZEKANoC7QfLG-CayeY9fTKRi0fL_1qesiJzuYl7cHpqrHAXEk1mvktsNKhxqiJPGXS4G-J9zRudYbKLkIUzbtRfq79cieFdF2YZDSCBks-eeuhLAZKx98kbIVhs2GS5G6ZnDGHcZA_onzXQ77iGI3XwuBhhzRvahJRyu5aDh4_z41XDBTYi5wodEvyfedAWRUNGW6o2b15br50GWqn-rqlPct481uD1K2E8CDeMugBYv9_qKWr4AY7XbU3KGV6idp5k7iZary3l4V_pyFXDjHiakxFbJ_qoMqUGKfoYSMjwwCmAJHn3K_ek1UiXZ1zPvEtIgMnqqGil8m6d90eKZX2KolTdSQwQG8DsgDL0WkeMg&refId=GYIQJJvOMei%2Bi5akGkRVfA%3D%3D&trackingId=R%2BGvMWJzM72XtA3ohjVCbA%3D%3D&trk=flagship3_search_srp_jobs",
        "Remote": false,
        "Internship": false,
        "Fresher": false,
        "isNew": true
      },
      {
        "job_id": "4188380022",
        "OpportunityID": "OPP-16168",
        "added_on": "2025-03-21",
        "job_title": "MERN Full Stack Developer (React.js/Node.js)",
        "job_provider": "LegalFriend",
        "job_location": "India (Remote)",
        "job_URL": "https://www.linkedin.com/jobs/view/4188380022/?eBP=CwEAAAGVunarZvYL3_O_HwA58mLBDfHPnQlMZtdJfOc2-P607cmgD6EqTUIpbgpn3RHxU3w2igamcfNmniwLYCW7XKgzAgkSXsv8MGjnBMc-2ruY7LqQ6LjaQ8HwUtxf_R2V_a-0m46eV8P6zCXLnwqtzgyw7L26en3gaaAfAgT8WYo-cHfk-q-R8vyJ-CcIz6ICzKHBtvmn9a5qo6IANjv_B_AJtNL4ynNHhRPDRNZVeWq4-qryeBouJBA3sb_9eYMad2XS4hekPuesu_hXV9PW1gTyaaaVpBZZbRHas1RBMF_wnCyDjMyDU1hMpim_0-eCxtZd_3fSXgCNAtdfxE2q-c0oJtKyZ3ziL2uiVC7gCQEKL7vXjUu9AZM9Z0qPqS-URnXouw1Owr43vpOc9bb_KU0obJkBs0OheVWHqzaaxf9DSyBMdfBzChtbK-RXDRptJiYIuBiy3NTQTxZn4y3A0h17ANePjK_JgCswGLcnRuCy&refId=GYIQJJvOMei%2Bi5akGkRVfA%3D%3D&trackingId=UZIM0pHwoDfd6t2g0tx59A%3D%3D&trk=flagship3_search_srp_jobs",
        "Remote": true,
        "Internship": false,
        "Fresher": false,
        "isNew": true
      },
      {
        "job_id": "4186490325",
        "OpportunityID": "OPP-63064",
        "added_on": "2025-03-21",
        "job_title": "Full Stack Engineer(6 months to 2 years)",
        "job_provider": "Xscale Consulting - Scaling B2B Companies.",
        "job_location": "Vasant Vihar, Delhi, India (On-site)",
        "job_URL": "https://www.linkedin.com/jobs/view/4186490325/?eBP=CwEAAAGVunarZnCU13fRrCbDClckN_8Qb_N18GdDTeARXWVkpuwAn7JBPi_6ufBxDJL7A4uirelhu4bvlwRL4Zk21YtQAY-adthc4FtIgfKiDYWUz7kD4FjkUHK20l2xEN6IM-zlf6JyGu1euGjMPtqZcFLzUXl3Przh0XS-PSP5QJCo5D_jqM9dWaKcPljtrjkmmpqu-ODQgJjmeD4QKygmrqcCeo5AKow_ZGjkYERmImbQa-TIplkhOQ3lfD2WPVZ2crBqumqvUzJtPrNoDcEA1s1j2RdbUsfLZYX_hZHypqdpRiMyg59opEZXh7s23eFTi-e-w75JJ4hQZKbYB4-ZGzMZbx-gnrqqQASLkLsaALeSHtBubYhNCf-67UVHS2tBk3AXk2JLt3GCGBiV1m_Srfk1k2SvYliEJ5kZBNVEpzcqdtVUuh0H9rSsCT7MrMPpWliSoubTdtUZGN2fga1p&refId=GYIQJJvOMei%2Bi5akGkRVfA%3D%3D&trackingId=CgHEnsz2EHbdEjXyC%2BIhTA%3D%3D&trk=flagship3_search_srp_jobs",
        "Remote": false,
        "Internship": false,
        "Fresher": false,
        "isNew": true
      },
      {
        "job_id": "4190487719",
        "OpportunityID": "OPP-67812",
        "added_on": "2025-03-21",
        "job_title": "Full Stack Developer (React, Spring Boot)",
        "job_provider": "DreamSol TeleSolutions Private Limited",
        "job_location": "Gautam Buddha Nagar, Uttar Pradesh, India (On-site)",
        "job_URL": "https://www.linkedin.com/jobs/view/4190487719/?eBP=CwEAAAGVunarZnoDSUpGbWnKF9rCjxu9hMSHZXeuk5UiE3Ab2hqW34695yihv69xc4fE3s8yY9wIXnZBDY11_AKdJ8xYMNU_xYR4RDyd3JM2vIP9UAOZFAcaYe3PDJB-ZSipcRGA9e_wfr7U3_xlfSliU26J5P5FbUaeLiZduDQrwXE9X6BGQOGRCtz7MghewNyTDQseR-XYev860deNv4HVPxVSSV3JnOcrHflWZBiymqVWtx4BAlXYpnJzRx_6l1LdBUrxmcIezKSoa2hUq3vtZtjuZClobadWVODUEnYBeE0DRh6Z5LldCdU_anq88YPGlH4As0DUIBDITnXWkOAoZFrXLKvo4obUdHVWY5Vjfoxn46-lS9SjzfjsL8hXKGHmaZ-K7SB0myJ18k0TyPSTdKLxwto0l9ghRdofFK4-FjhKTx5e_owhNDpiIl_JHNweSFDr7mf94PkaY83ullFD&refId=GYIQJJvOMei%2Bi5akGkRVfA%3D%3D&trackingId=0l4eMOYi6LewGtPDSmBOZA%3D%3D&trk=flagship3_search_srp_jobs",
        "Remote": false,
        "Internship": false,
        "Fresher": false,
        "isNew": true
      },
      {
        "job_id": "4187002426",
        "OpportunityID": "OPP-2037",
        "added_on": "2025-03-21",
        "job_title": "Full Stack Web Developer Intern",
        "job_provider": "Unified Mentor",
        "job_location": "India (Remote)",
        "job_URL": "https://www.linkedin.com/jobs/view/4187002426/?eBP=BUDGET_EXHAUSTED_JOB&refId=GYIQJJvOMei%2Bi5akGkRVfA%3D%3D&trackingId=lFzkVPNQmDbsaRbujYaSlA%3D%3D&trk=flagship3_search_srp_jobs",
        "Remote": true,
        "Internship": false,
        "Fresher": false,
        "isNew": true
      },
      {
        "job_id": "4190017796",
        "OpportunityID": "OPP-6016",
        "added_on": "2025-03-21",
        "job_title": "Junior Full Stack Developer in Mumbai, Mira Bhayandar, Vasai-Virar",
        "job_provider": "TryCatch Classes",
        "job_location": "Vasai Virar, Maharashtra, India (On-site)",
        "job_URL": "https://www.linkedin.com/jobs/view/4190017796/?eBP=CwEAAAGVunarZ-JKimCKhZw6fufEfTXX4raSKgMbqRdfLGaQRwVX_4taTvhTyT8bMnJjIWPhDB2Lg1yfUV7WGPphlTyw_Xb0HrHna5YodLfQMoyBLnTUVP4a_VNl7qDTWumTMMG4jYg3MNYEpGz7hgRlijoHphtF51CI214ybMV7yRkrZsMB91dowxG8w7e8p3XGQkScz31TMe37xyy1WkjMulr_eoxzsK7uqGJCOyzShWEfLqhWTGR8CZUbEtSYxoS1yCDWXxOMt4CQGFMMsxm_YFDzjmPSkk7IhUSlqV031frPMEOzgEmG4UnlNMM3XNTrlC75i5NyYTvY5JtHv8nvs-o-EcUkRfFasRh0Co_6KvBwMZelylR5kC98m_qjMzFstoLAkx-fvDnMEeQkO4qZtctXHA7uUxukh7gz0Y214nCKQuGwcMCfmYVv8LgT2v7llPwouc5p6Vox8JqvCA&refId=GYIQJJvOMei%2Bi5akGkRVfA%3D%3D&trackingId=j0F6yZxpgpIcivRyItx%2BYQ%3D%3D&trk=flagship3_search_srp_jobs",
        "Remote": false,
        "Internship": false,
        "Fresher": false,
        "isNew": true
      }
    ]; // ✅ Array to store results from all scrapers

    // const linkedInResults = await linkedInScraper(browser, jobRequirements);
    // allJobResults.push(...linkedInResults); // ✅ Add LinkedIn results
    
    const indeedResults = await indeedScraper(browser, jobRequirements);
    allJobResults.push(...indeedResults); // ✅ Add Indeed results
    
    
   


    // const timestamp = moment().format("DD-MMM-YYYY HH:mm:ss");
    // 4️⃣ Close Puppeteer
    // await browser.close();
    console.log("✅ Puppeteer browser closed...");

    // 5️⃣ Create Daily Update Object with timestamp
   
    
  
    
    // ✅ Insert into `job_updates` table
    for (const job of allJobResults) {
      const updateQuery = `
        UPDATE job_updates
        SET updates = array_append(updates, $1::jsonb)
        WHERE job_id = $2
      `;
      await pool.query(updateQuery, [job, job_id]);
    }
    

    console.log("✅ Job scraping results saved successfully for:", job_id);
    return { success: true, job_id };
  } catch (error) {
    console.error("❌ Error in scrapeJobs:", error);
    return { success: false, error: error.message };
  }
};

// await scrapeJobs("job_d70df0f8-1c3c-4935-8758-a413b2f7bcfb");

export default scrapeJobs;