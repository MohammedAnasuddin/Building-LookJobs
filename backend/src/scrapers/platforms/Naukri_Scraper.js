import { buildNaukriUrl } from "../../utils/urlBuilders.js";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Extracts job cards from current Naukri results page.
 */
const extractNaukriJobs = async (page) => {
  const today = new Date();
  const formattedDate = `${String(today.getDate()).padStart(2, "0")}-${String(
    today.getMonth() + 1
  ).padStart(2, "0")}-${today.getFullYear()}`;

  return await page.evaluate((formattedDate) => {
    const jobCards = document.querySelectorAll(".srp-jobtuple-wrapper");
    return Array.from(jobCards).map((card, i) => {
      const jobTitle = card.querySelector(".title")?.innerText.trim() || "N/A";
      const company = card.querySelector(".comp-name")?.innerText.trim() || "N/A";
      const location = card.querySelector(".loc")?.innerText.trim() || "N/A";
      const jobURL = card.querySelector("a.title")?.href || "N/A";
      const exp = card.querySelector(".exp")?.innerText.trim() || "";

      // FIX: Extract clean job ID from URL instead of storing full URL
      // Naukri URL pattern: /job-listings-title-company-city-123456789
      const rawId = jobURL.split("/").pop()?.split("?")[0] || `${Math.random()}`;
      const jobId = `NAUKRI-${rawId}`;

      return {
        job_id: jobId,
        OpportunityID: `${formattedDate}-NKRI-${i}`,
        added_on: new Date().toISOString().split("T")[0],
        source: "Naukri",
        job_title: jobTitle,
        job_provider: company,
        job_location: location,
        job_URL: jobURL,
        Remote: location.toLowerCase().includes("remote"),
        Internship: jobTitle.toLowerCase().includes("intern"),
        Fresher:
          exp.toLowerCase().includes("0-") ||
          exp.toLowerCase().includes("fresher") ||
          exp === "",
        isNew: true,
      };
    });
  }, formattedDate);
};

/**
 * Main Naukri scraper.
 * Public URL — no login needed.
 * Returns: { [job_id]: [jobs array] }
 */
const naukriScraper = async (browser, allJobRequirements) => {
  console.log("🚀 [Naukri] Starting scraper...");
  const page = await browser.newPage();
  page.setDefaultNavigationTimeout(60000);
  page.setDefaultTimeout(60000);

  const results = {};

  for (const req of allJobRequirements) {
    console.log(`🔍 [Naukri] Scraping: "${req.job_title}" in ${req.location}`);
    try {
      const url = buildNaukriUrl(req);
      console.log(`   → ${url}`);

      await page.goto(url, { waitUntil: "domcontentloaded" });
      await delay(1500);

      try {
        await page.waitForSelector(".srp-jobtuple-wrapper", { timeout: 8000 });
      } catch {
        console.log(`   ⚠️  No results found`);
        results[req.job_id] = [];
        continue;
      }

      await delay(800);
      const jobs = await extractNaukriJobs(page);
      console.log(`   ✅ ${jobs.length} jobs found`);
      results[req.job_id] = jobs;

      await delay(2000 + Math.random() * 1500);
    } catch (err) {
      console.error(`   ❌ Failed:`, err.message);
      results[req.job_id] = [];
    }
  }

  await page.close();
  console.log("🔒 [Naukri] Done");
  return results;
};

export default naukriScraper;
