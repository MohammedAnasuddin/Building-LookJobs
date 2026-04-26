import { buildInternshalaUrl } from "../../utils/urlBuilders.js";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Extracts job/internship cards from current Internshala results page.
 */
const extractInternshalaJobs = async (page) => {
  const today = new Date();
  const formattedDate = `${String(today.getDate()).padStart(2, "0")}-${String(
    today.getMonth() + 1
  ).padStart(2, "0")}-${today.getFullYear()}`;

  return await page.evaluate((formattedDate) => {
    const jobCards = document.querySelectorAll(".internship_meta");
    return Array.from(jobCards).map((card, i) => {
      const jobTitle =
        card.querySelector(".job-internship-name")?.innerText.trim() || "N/A";
      const company =
        card.querySelector(".company-name")?.innerText.trim() || "N/A";
      const location =
        card.querySelector("#location_names span a")?.innerText.trim() || "N/A";
      const jobURL = card.querySelector(".view_detail_button")?.href || "N/A";

      // Extract clean ID from Internshala URL
      // Pattern: /internship/detail/nodejs-developer-internship-at-abc123456
      const rawId = jobURL.split("/").pop() || `${Math.random()}`;
      const jobId = `INTSH-${rawId}`;

      return {
        job_id: jobId,
        OpportunityID: `${formattedDate}-INTSH-${i}`,
        added_on: new Date().toISOString().split("T")[0],
        source: "Internshala",
        job_title: jobTitle,
        job_provider: company,
        job_location: location,
        job_URL: jobURL,
        Remote: location.toLowerCase().includes("remote"),
        Internship: jobTitle.toLowerCase().includes("internship") || true, // Internshala is always internship
        Fresher: true, // Internshala is always fresher-friendly
        isNew: true,
      };
    });
  }, formattedDate);
};

/**
 * Main Internshala scraper.
 * Public URL — no login needed.
 * Returns: { [job_id]: [jobs array] }
 */
const internshalaScraper = async (browser, allJobRequirements) => {
  console.log("🚀 [Internshala] Starting scraper...");
  const page = await browser.newPage();
  page.setDefaultNavigationTimeout(60000);
  page.setDefaultTimeout(60000);

  const results = {};

  for (const req of allJobRequirements) {
    // Only scrape Internshala if user wants internships OR is a fresher
    if (!req.will_intern && !req.is_fresher) {
      console.log(`   ⏭️  Skipping ${req.job_title} — not intern/fresher requirement`);
      results[req.job_id] = [];
      continue;
    }

    console.log(`🔍 [Internshala] Scraping: "${req.job_title}" in ${req.location}`);
    try {
      const url = buildInternshalaUrl(req);
      console.log(`   → ${url}`);

      await page.goto(url, { waitUntil: "domcontentloaded" });

      try {
        await page.waitForSelector(".internship_meta", { timeout: 10000 });
      } catch {
        console.log(`   ⚠️  No results found`);
        results[req.job_id] = [];
        continue;
      }

      await delay(800);
      const jobs = await extractInternshalaJobs(page);
      console.log(`   ✅ ${jobs.length} jobs found`);
      results[req.job_id] = jobs;

      await delay(2000 + Math.random() * 1000);
    } catch (err) {
      console.error(`   ❌ Failed:`, err.message);
      results[req.job_id] = [];
    }
  }

  await page.close();
  console.log("🔒 [Internshala] Done");
  return results;
};

export default internshalaScraper;
