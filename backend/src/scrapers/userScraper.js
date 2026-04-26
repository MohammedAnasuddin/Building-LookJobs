import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
puppeteer.use(StealthPlugin());


import pool from "../db/db_setup.js";
import { storeResults } from "../services/jobStorage.service.js";
import { runPlatformScraping } from "./coreEngine.js";
import { filterRelevantJobs } from "../utils/relevanceFilter.js";

export async function runScrapeForJob(jobId) {
  console.log(`🚀 [User] Scraping ${jobId}`);

  // 🔹 fetch ONLY this job
  const { rows } = await pool.query(
    "SELECT * FROM job_requirements WHERE job_id = $1",
    [jobId]
  );

  if (rows.length === 0) return;

  const requirement = rows[0];

  const browser = await puppeteer.launch({ headless: true });

  // 🔥 reuse engine but pass SINGLE requirement
  const results = await runPlatformScraping(browser, [requirement]);

  await browser.close();

  const jobs = results[jobId] || [];

  const filtered = await filterRelevantJobs(jobs, requirement);

  console.log(`✅ [User] ${filtered.length} jobs after filter`);

  // 👉 store (reuse your storeResults)
  await storeResults(jobId, filtered);
}