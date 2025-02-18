import puppeteer from 'puppeteer-extra';
import StealthPlugin from "puppeteer-extra-plugin-stealth";
puppeteer.use(StealthPlugin());
import promptSync from 'prompt-sync'
import fs from 'fs'
const prompt = promptSync();

const browser = await puppeteer.launch({ defaultViewport: null, headless: false });
let job_requested = prompt("Enter the Job Role: ");
let job_requested_location_City = prompt("Enter the Preferred Location(City): ");
let job_requested_location_State = prompt("Enter the Preferred Location(State): ");

// await LinkedIN_Job_Fetch(browser, job_requested, job_requested_location_City)
await Indeed_Job_Fetch(browser, job_requested, job_requested_location_City,job_requested_location_State)


async function LinkedIN_Job_Fetch(browser, jobTitle, jobLocation) {
  const page = await browser.newPage();
  await page.goto("https://www.linkedin.com/login");
  await page.waitForSelector("#username", { visible: true });
  await page.waitForSelector("#password", { visible: true });
  await page.waitForSelector("button[type=submit]", { visible: true });

  await page.type("#username", "jobsfetch1@gmail.com", { delay: 150 });
  await page.type("#password", "jobsfetch@linkedIN", { delay: 150 });

  await page.click("button[type=submit]");
  await page.waitForNavigation({ waitUntil: "domcontentloaded" });

  await page.waitForSelector("li.global-nav__primary-item:nth-of-type(3)");
  await page.click("li.global-nav__primary-item:nth-of-type(3)", { waitUntil: ['domcontentloaded'] });

  await page.waitForSelector("input[id^='jobs-search-box-keyword-id-']");
  await page.waitForSelector("input[id^='jobs-search-box-location-id-']");

  const LinkedIN_Job_Input = await page.$("input[id^='jobs-search-box-keyword-id-']");
  const LinkedIN_Location_Input = await page.$("input[id^='jobs-search-box-location-id-']");

  if (LinkedIN_Job_Input) {
    await LinkedIN_Job_Input.click({ clickCount: 3 }); // Select all text
    await LinkedIN_Job_Input.type(jobTitle, { delay: 100 });
  }

  if (LinkedIN_Location_Input) {
    await LinkedIN_Location_Input.click({ clickCount: 3 });
    await LinkedIN_Location_Input.type(jobLocation, { delay: 100 });
  }

  await LinkedIN_Job_Input.press("Enter");

  await page.waitForSelector(".job-card-container");

  const jobs = await page.evaluate(() => {
    const jobCards = document.querySelectorAll(".job-card-container");
    const jobData = [];

    jobCards.forEach((card) => {
      const spans = card.getElementsByTagName("span");
      const jobTitle = spans[0]?.textContent?.trim() || "N/A";
      const jobProvider = spans[2]?.textContent?.trim() || "N/A";
      const jobURL = card.querySelector("a")?.href || "N/A";

      jobData.push({
        Job_title: jobTitle,
        Job_provider: jobProvider,
        Job_URL: jobURL,
      });
    });

    return jobData;
  });

  fs.writeFileSync("src/Job_Updates_Data/LinkedIn_jobs.json", JSON.stringify(jobs, null, 2));


}


async function Indeed_Job_Fetch(browser, job_requested, job_requested_location_City,job_requested_location_State) {
  browser = await puppeteer.launch({ 
   headless: false, 
   args: ['--no-sandbox', '--disable-setuid-sandbox'] 
 });

 const page = await browser.newPage();
 // Format the search query for the Indeed URL
 const formattedRole = job_requested.split(' ').join('+');
 const formattedLocation = `${job_requested_location_City}%2C+${job_requested_location_State}`;
 const url = `https://in.indeed.com/jobs?q=${formattedRole}&l=${formattedLocation}&from=searchOnHP%2Cwhatautocomplete`;
//  const url = `https://in.indeed.com`;

 await page.goto(url);

 // Wait for job cards to load
 await page.waitForSelector('.slider_item');


 // Extract job details
 const jobDetails = await page.evaluate(() => {
   const jobCards = document.querySelectorAll('.slider_item');
   const details = [];

   jobCards.forEach((card) => {
     const title = card.querySelector('.jobTitle') ? card.querySelector('.jobTitle').innerText : null;
     const company = card.querySelector("span[data-testid='company-name']") ? card.querySelector("span[data-testid='company-name']").innerText : null;
     const location = card.querySelector("div[data-testid='text-location']") ? card.querySelector("div[data-testid='text-location']").innerText : null;

     if (title && company && location) {
       details.push({ title, company, location });
     }
   });

   return details;
 });


 // Save the data to a JSON file
 const filePath = "src/Job_Updates_Data/Indeed_Jobs_Data";
 fs.writeFileSync(filePath, JSON.stringify(jobDetails, null, 2));

 
}
await browser.close();
console.log("Jobs Fetched Successfully");





