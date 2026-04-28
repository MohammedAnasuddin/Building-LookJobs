// import { runScrapeCycle } from "../cron/jobScraperCron.js";

export const runScraper = async (req, res) => {
  try {
    // await runScrapeCycle("MANUAL DEMO");

    res.json({ message: "Scraper run completed" });
  } catch (err) {
    res.status(500).json({ message: "Scraper failed" });
  }
};