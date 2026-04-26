import cron from "node-cron";
import { runScrapeBatch } from "../scrapers/batchScraper.js";

cron.schedule("0 */6 * * *", async () => {
  console.log("⏰ Running batch scraper...");

  await runScrapeBatch();
});