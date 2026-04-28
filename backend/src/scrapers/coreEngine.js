import indeedScraper from "./platforms/Indeed_Scraper.js";
import naukriScraper from "./platforms/Naukri_Scraper.js";
import internshalaScraper from "./platforms/Internshala_Scraper.js";
import linkedInScraper from "./platforms/LinkedIn_Scraper.js"; 

import { withTimeout } from "../utils/withTimeout.js";

export async function runPlatformScraping(browser, requirements) {
  const allResults = {};

  const mergeResults = (platformResults) => {
    for (const [jobId, jobs] of Object.entries(platformResults || {})) {
      if (!allResults[jobId]) allResults[jobId] = [];
      allResults[jobId].push(...jobs);
    }
  };

  // 🔴 LinkedIn (guarded)
  if (process.env.ENABLE_LINKEDIN === "true") {
    try {
      const res = await withTimeout(
        linkedInScraper(browser, requirements),
        30000,
        "LinkedIn"
      );
      mergeResults(res);
      console.log("✅ LinkedIn done");
    } catch (e) {
      console.error("❌ LinkedIn failed:", e.message);
    }
  } else {
    console.log("⏭️ LinkedIn skipped");
  }

  // 🟢 Indeed
  try {
    const res = await withTimeout(
      indeedScraper(browser, requirements),
      30000,
      "Indeed"
    );
    mergeResults(res);
    console.log("✅ Indeed done");
  } catch (e) {
    console.error("❌ Indeed failed:", e.message);
  }

  // 🟢 Naukri
  try {
    const res = await withTimeout(
      naukriScraper(browser, requirements),
      30000,
      "Naukri"
    );
    mergeResults(res);
    console.log("✅ Naukri done");
  } catch (e) {
    console.error("❌ Naukri failed:", e.message);
  }

  // 🟢 Internshala (filtered)
  const internReqs = requirements.filter((r) => r.will_intern);

  if (internReqs.length > 0) {
    try {
      const res = await withTimeout(
        internshalaScraper(browser, internReqs),
        30000,
        "Internshala"
      );
      mergeResults(res);
      console.log("✅ Internshala done");
    } catch (e) {
      console.error("❌ Internshala failed:", e.message);
    }
  }

  return allResults;
}