import fs from "fs";
import path from "path";

const indeedScraper = async (browser) => {
  const page = await browser.newPage();

  await page.goto("https://internshala.com/internships/full-stack-development-internship-in-hyderabad/", { waitUntil: 'domcontentloaded' });
  await page.goto("https://www.naukri.com/fullstack-developer-jobs-in-hyderabad-secunderabad", { waitUntil: 'domcontentloaded' });

  // await page.waitForSelector('.slider_item');
  // console.log("📋 Fetching Indeed job data...");

  // const jobs = await page.evaluate(() => {
  //   const jobCards = document.querySelectorAll('.slider_item');
  //   return Array.from(jobCards).map((card) => {
  //     const title = card.querySelector('.jobTitle')?.innerText || 'N/A';
  //     const company = card.querySelector("span[data-testid='company-name']")?.innerText || 'N/A';
  //     const location = card.querySelector("div[data-testid='text-location']")?.innerText || 'N/A';
  //     const jobURL = card.querySelector('a')?.href || 'N/A';

  //     const spans = Array.from(card.querySelectorAll("span"));

  //     return {
  //       job_id: card.getAttribute("data-jk") || `INDEED-${Math.floor(Math.random() * 100000)}`,
  //       OpportunityID: `OPP-${Math.floor(Math.random() * 100000)}`,
  //       added_on: new Date().toISOString().split("T")[0],
  //       job_title: title,
  //       job_provider: company,
  //       job_location: location,
  //       job_URL: jobURL.startsWith("http") ? jobURL : `https://in.indeed.com${jobURL}`,
  //       Remote: spans.some(span => span.textContent.includes("Remote")),
  //       Internship: spans.some(span => span.textContent.toLowerCase().includes("internship")),
  //       Fresher: spans.some(span => span.textContent.toLowerCase().includes("entry level")),
  //       isNew: true
  //     };
  //   });
  // });

  // const jsonPath = path.resolve("Indeed_jobs.json");
  // fs.writeFileSync(jsonPath, JSON.stringify(jobs, null, 2));
  // console.log(`✅ Job details saved to ${jsonPath}`);
  // await page.close();
  // console.log("🔒 Closed Indeed page");

  // return jobs;
};

export default indeedScraper;
