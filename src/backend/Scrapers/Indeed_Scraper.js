import dotenv from "dotenv";
dotenv.config();

import { saveCookies, loadCookies, clearCookies } from "../utils/cookieManager.js";
import { buildIndeedUrl } from "../utils/urlBuilders.js";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Ensures session is active on Indeed.
 * Indeed doesn't require login for basic scraping but cookies help avoid CAPTCHAs.
 */
const ensureIndeedSession = async (page) => {
  await loadCookies(page, "indeed");

  await page.goto("https://in.indeed.com", { waitUntil: "domcontentloaded" });
  await delay(1500);

  // If CAPTCHA or block page detected, clear cookies and retry fresh
  const blocked = await page.evaluate(() => {
    return document.title.toLowerCase().includes("captcha") ||
      document.title.toLowerCase().includes("blocked") ||
      document.body.innerText.toLowerCase().includes("verify you are human");
  });

  if (blocked) {
    console.log("⚠️  [Indeed] Blocked — clearing cookies and retrying fresh session");
    clearCookies("indeed");
    await page.goto("https://in.indeed.com", { waitUntil: "domcontentloaded" });
    await delay(2000);
  }

  await saveCookies(page, "indeed");
  console.log("✅ [Indeed] Session ready");
};

/**
 * Extracts job cards from current Indeed results page.
 */
const extractIndeedJobs = async (page) => {
  const today = new Date();
  const formattedDate = `${String(today.getDate()).padStart(2, "0")}-${String(
    today.getMonth() + 1
  ).padStart(2, "0")}-${today.getFullYear()}`;

  return await page.evaluate((formattedDate) => {
    const jobCards = document.querySelectorAll(".job_seen_beacon");
    return Array.from(jobCards).map((card, i) => {
      const title = card.querySelector(".jobTitle")?.innerText.trim() || "N/A";
      const company =
        card.querySelector("[data-testid='company-name']")?.innerText.trim() || "N/A";
      const location =
        card.querySelector(".companyLocation")?.innerText.trim() || "N/A";
      const anchor = card.querySelector("a");
      const jobKey = anchor?.dataset?.jk || `INDD-${Math.random()}`;
      const jobURL = anchor?.href || "N/A";

      return {
        job_id: `INDD-${jobKey}`,
        OpportunityID: `${formattedDate}-INDD-${i}`,
        added_on: new Date().toISOString().split("T")[0],
        source: "Indeed",
        job_title: title,
        job_provider: company,
        job_location: location,
        job_URL: jobURL,
        Remote: location.toLowerCase().includes("remote"),
        Internship: title.toLowerCase().includes("intern"),
        Fresher: title.toLowerCase().includes("fresher") || title.toLowerCase().includes("entry"),
        isNew: true,
      };
    });
  }, formattedDate);
};

/**
 * Main Indeed scraper.
 * Session established once, then loops over all job requirements.
 * Returns: { [job_id]: [jobs array] }
 */
const indeedScraper = async (browser, allJobRequirements) => {
  console.log("🚀 [Indeed] Starting scraper...");
  const page = await browser.newPage();
  page.setDefaultNavigationTimeout(60000);
  page.setDefaultTimeout(60000);

  await ensureIndeedSession(page);

  const results = {};

  for (const req of allJobRequirements) {
    console.log(`🔍 [Indeed] Scraping: "${req.job_title}" in ${req.location}`);
    try {
      const url = buildIndeedUrl(req);
      console.log(`   → ${url}`);

      await page.goto(url, { waitUntil: "domcontentloaded" });
      await delay(2000);

      // Check for CAPTCHA
      const blocked = await page.evaluate(() =>
        document.body.innerText.toLowerCase().includes("verify you are human") ||
        document.title.toLowerCase().includes("captcha")
      );

      if (blocked) {
        console.log(`   ⚠️  CAPTCHA detected — skipping this round`);
        results[req.job_id] = [];
        await delay(5000); // Wait longer before next request
        continue;
      }

      try {
        await page.waitForSelector(".job_seen_beacon", { timeout: 8000 });
      } catch {
        console.log(`   ⚠️  No results found`);
        results[req.job_id] = [];
        continue;
      }

      await delay(1000);
      const jobs = await extractIndeedJobs(page);
      console.log(`   ✅ ${jobs.length} jobs found`);
      results[req.job_id] = jobs;

      // Save updated cookies after each successful request
      await saveCookies(page, "indeed");

      await delay(3000 + Math.random() * 2000);
    } catch (err) {
      console.error(`   ❌ Failed:`, err.message);
      results[req.job_id] = [];
    }
  }

  await page.close();
  console.log("🔒 [Indeed] Done");
  return results;
};

export default indeedScraper;
