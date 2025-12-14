import scrapeJobs from "./scraperService.js";

const JOB_ID = "job_43913b86-f805-4b6a-a03b-e581673868ee";
const DATE = "2025-12-13";

(async () => {
  console.log("🧪 Manual scrape trigger...");
  await scrapeJobs(JOB_ID);
  console.log("✅ Done");
  process.exit(0);
})();
