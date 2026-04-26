import dotenv from "dotenv";
dotenv.config();

import {
  saveCookies,
  loadCookies,
  clearCookies,
} from "../../utils/cookieManager.js";
import { buildLinkedInUrl } from "../../utils/urlBuilders.js";
import { sendCaptchaAlert } from "../../utils/alertService.js";

const USERNAME = process.env.LINKEDIN_MAIL;
const PASSWORD = process.env.LINKEDIN_PASSWORD;
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Ensures the browser page is logged into LinkedIn.
 * Uses saved cookies first. Falls back to credential login if needed.
 */
const ensureLinkedInLogin = async (page) => {
  await loadCookies(page, "linkedin");

  await page.goto("https://www.linkedin.com/feed", {
    waitUntil: "domcontentloaded",
  });
  await delay(1500);

  // If still on login page, cookies failed — login fresh
  if (page.url().includes("/login") || page.url().includes("/authwall")) {
    console.log("🔑 [LinkedIn] Cookies expired — logging in fresh...");
    clearCookies("linkedin");

    await page.goto("https://www.linkedin.com/login", {
      waitUntil: "domcontentloaded",
    });
    await delay(500);

    await page.type("#username", USERNAME, { delay: 120 });
    await page.type("#password", PASSWORD, { delay: 120 });

    await page.click("button[type=submit]");

    console.log("⏳ [LinkedIn] Waiting for login to complete...");

    // Wait for feed nav OR captcha — whichever appears first
    await Promise.race([
      page.waitForSelector("nav.global-nav", { timeout: 60000 }),
      page.waitForSelector("input.search-global-typeahead__input", {
        timeout: 60000,
      }),
      page.waitForSelector("iframe[src*='recaptcha']", { timeout: 60000 }),
    ]).catch(() => {
      console.log("⚠️  [LinkedIn] Timeout — proceeding anyway");
    });

    await delay(2000);

    // ── CAPTCHA Detection ─────────────────────────────────────────
    const captchaDetected = await page.evaluate(() => {
      return !!(
        document.querySelector("iframe[src*='recaptcha']") ||
        document.querySelector(".recaptcha-checkbox") ||
        document.querySelector("#captcha-internal") ||
        document.title.toLowerCase().includes("security verification") ||
        document.body.innerText
          .toLowerCase()
          .includes("verify you're not a robot")
      );
    });

    if (captchaDetected) {
      console.log(
        "🚨 [LinkedIn] reCAPTCHA detected — sending Telegram alert...",
      );
      await sendCaptchaAlert("LinkedIn");
      console.log(
        "⏳ [LinkedIn] Waiting up to 5 mins for you to solve CAPTCHA...",
      );

      // Wait for feed to appear after human solves CAPTCHA
      await page
        .waitForSelector("nav.global-nav", { timeout: 300000 })
        .then(() => console.log("✅ [LinkedIn] CAPTCHA solved! Continuing..."))
        .catch(() =>
          console.log(
            "⚠️  [LinkedIn] CAPTCHA timeout — skipping LinkedIn this run",
          ),
        );
    }

    // Final URL check
    const currentUrl = page.url();
    if (currentUrl.includes("/feed") || currentUrl.includes("/jobs")) {
      console.log("✅ [LinkedIn] Logged in successfully, URL:", currentUrl);
    } else {
      console.log("⚠️  [LinkedIn] Unexpected URL after login:", currentUrl);
    }

    await saveCookies(page, "linkedin");
    console.log("✅ [LinkedIn] Cookies saved");
  } else {
    console.log("✅ [LinkedIn] Session active via cookies");
  }
};

/**
 * Extracts job cards from the current LinkedIn search results page.
 */
const extractLinkedInJobs = async (page) => {
  const today = new Date();
  const formattedDate = `${String(today.getDate()).padStart(2, "0")}-${String(
    today.getMonth() + 1,
  ).padStart(2, "0")}-${today.getFullYear()}`;

  return await page.evaluate((formattedDate) => {
    const jobCards = document.querySelectorAll(".job-card-container");
    return Array.from(jobCards).map((card, i) => {
      const spans = Array.from(card.getElementsByTagName("span"));
      return {
        job_id: card.getAttribute("data-job-id") || `LNKD-${Math.random()}`,
        OpportunityID: `${formattedDate}-LNKD-${i}`,
        added_on: new Date().toISOString().split("T")[0],
        source: "LinkedIn",
        job_title: spans[0]?.textContent?.trim() || "N/A",
        job_provider: spans[2]?.textContent?.trim() || "N/A",
        job_location: spans[3]?.textContent?.trim() || "N/A",
        job_URL: card.querySelector("a")?.href || "N/A",
        Remote: spans.some((s) => s.textContent.includes("Remote")),
        Internship: spans.some((s) => s.textContent.includes("Internship")),
        Fresher: spans.some((s) => s.textContent.includes("Entry Level")),
        isNew: true,
      };
    });
  }, formattedDate);
};

/**
 * Main LinkedIn scraper.
 * Accepts browser + array of ALL job requirements.
 * Logs in ONCE, then loops over each requirement.
 * Returns: { [job_id]: [jobs array] }
 */
const linkedInScraper = async (browser, allJobRequirements) => {
  console.log("🚀 [LinkedIn] Starting scraper...");
  const page = await browser.newPage();
  page.setDefaultNavigationTimeout(60000);
  page.setDefaultTimeout(60000);

  await ensureLinkedInLogin(page);

  const results = {};

  for (const req of allJobRequirements) {
    console.log(
      `🔍 [LinkedIn] Scraping: "${req.job_title}" in ${req.location}`,
    );
    try {
      const url = buildLinkedInUrl(req);
      console.log(`   → ${url}`);

      await page.goto(url, { waitUntil: "domcontentloaded" });
      await delay(2000);

      try {
        await page.waitForSelector(".job-card-container", { timeout: 8000 });
      } catch {
        console.log(`   ⚠️  No results found`);
        results[req.job_id] = [];
        continue;
      }

      await delay(1000);
      const jobs = await extractLinkedInJobs(page);
      console.log(`   ✅ ${jobs.length} jobs found`);
      results[req.job_id] = jobs;

      // Polite delay between searches
      await delay(3000 + Math.random() * 2000);
    } catch (err) {
      console.error(`   ❌ Failed:`, err.message);
      results[req.job_id] = [];
    }
  }

  await page.close();
  console.log("🔒 [LinkedIn] Done");
  return results;
};

export default linkedInScraper;
