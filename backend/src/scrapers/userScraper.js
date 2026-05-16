import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";

puppeteer.use(StealthPlugin());

import pool from "../db/db_setup.js";

import { storeResults } from "../services/jobStorage.service.js";

import { runPlatformScraping } from "./coreEngine.js";

import { filterRelevantJobs } from "../utils/relevanceFilter.js";

export async function runScrapeForJob(jobReqId) {
  console.log(`🚀 [User] Scraping ${jobReqId}`);

  let browser;

  try {
    // =========================
    // MARK AS SCRAPING
    // =========================

    await pool.query(
      `
  UPDATE job_requirements

  SET
    scrape_status = 'scraping',
    scrape_stage = 'scraping_jobs',
    progress = 25

  WHERE job_req_id = $1
  `,
      [jobReqId],
    );

    // =========================
    // FETCH REQUIREMENT
    // =========================

    const { rows } = await pool.query(
      `
      SELECT *
      FROM job_requirements
      WHERE job_req_id = $1
      `,
      [jobReqId],
    );

    if (rows.length === 0) {
      return;
    }

    const requirement = rows[0];

    // =========================
    // START BROWSER
    // =========================

    browser = await puppeteer.launch({
      headless: true,
    });

    // =========================
    // SCRAPE
    // =========================

    const results = await runPlatformScraping(browser, [requirement]);

    const jobs = results[jobReqId] || [];

    console.log(`📊 ${jobs.length} jobs scraped`);

    // =========================
    // AI FILTER
    // =========================
    await pool.query(
      `UPDATE job_requirements

  SET
    scrape_stage = 'ai_filtering',
    progress = 60

  WHERE job_req_id = $1
  `,
      [jobReqId],
    );

    const filtered = await filterRelevantJobs(jobs, requirement);

    console.log(`✅ ${filtered.length} jobs after filter`);

    // =========================
    // STORE
    // =========================

    await pool.query(
      `
  UPDATE job_requirements

  SET
    scrape_stage = 'saving_jobs',
    progress = 85

  WHERE job_req_id = $1
  `,
      [jobReqId],
    );

    await storeResults(jobReqId, filtered);

    // =========================
    // MARK SUCCESS
    // =========================

    await pool.query(
      `
  UPDATE job_requirements

  SET
    scrape_status = 'completed',

    scrape_stage = 'completed',

    progress = 100,

    last_scraped_at = NOW(),

    last_scrape_error = NULL

  WHERE job_req_id = $1
  `,
      [jobReqId],
    );

    console.log(`🎉 Scrape completed for ${jobReqId}`);
  } catch (err) {
    console.error("❌ Scrape failed:", err);

    // =========================
    // MARK FAILED
    // =========================

    await pool.query(
      `
  UPDATE job_requirements

  SET
    scrape_status = 'failed',

    scrape_stage = 'failed',

    progress = 0,

    last_scrape_error = $2

  WHERE job_req_id = $1
  `,
      [jobReqId, err.message],
    );
  } finally {
    // =========================
    // ALWAYS CLOSE BROWSER
    // =========================

    if (browser) {
      await browser.close();
    }
  }
}
