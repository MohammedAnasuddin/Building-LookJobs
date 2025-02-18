import puppeteer from 'puppeteer-extra';
import StealthPlugin from "puppeteer-extra-plugin-stealth";
puppeteer.use(StealthPlugin());
import promptSync from 'prompt-sync'
import fs from 'fs'
const prompt = promptSync();



// (async () => {
//   //   //todo: Fetch the jobs from the url 
//   //   //Tip: To check puppeteer is acting as bot ot launch this site using it https://bot.sannysoft.com/


//   const browser = await puppeteer.launch({ defaultViewport: null, headless: false });
//   const page = await browser.newPage();


//   //>LinlkedIN : URL to Testing
//   // await page.goto('https://www.linkedin.com/jobs/search/?currentJobId=4120267872&f_E=1%2C2&geoId=105556991&keywords=full%20stack%20developer&origin=JOB_SEARCH_PAGE_JOB_FILTER&refresh=true')

//   await page.goto("https://www.linkedin.com/login");
//   await page.waitForSelector("#username", { visible: true })
//   await page.waitForSelector("#password", { visible: true })
//   await page.waitForSelector("button[type=submit]", { visible: true })

//   await page.type("#username", "jobsfetch1@gmail.com", { delay: 150 })
//   await page.type("#password", "jobsfetch@linkedIN", { delay: 150 })

//   await page.click("button[type=submit]")

//   await page.waitForNavigation({ waitUntil: "domcontentloaded" });

//   console.log("Searching For Job.....")
//   await page.waitForSelector("li.global-nav__primary-item:nth-of-type(3)");
//   await page.click("li.global-nav__primary-item:nth-of-type(3)", { waitUntil: ['domcontentloaded'] });

//   // await page.click('li.global-nav__primary-item(2)', { waitUntil: ['domcontentloaded', 'networkidle2'] })

//   // await page.waitForNavigation({ waitUntil: "networkidle2" });

//   // //> Waiting for Job and Location Inputs
//   // const LinkedIN_Job_Input = "#jobs-search-box-keyword-id-ember562:nth-of-type(0)"
//   // const LinkedIN_Location_Input = "#jobs-search-box-location-id-ember562:nth-of-type(0)"

//   // await page.waitForSelector(LinkedIN_Job_Input)

//   // await page.waitForSelector(LinkedIN_Location_Input)

//   // console.log("Landed on LinkedIn Jobs Page")

//   // let job_requested = prompt("Enter the Job Looking For: ")
//   // let job_requested_location = prompt("Enter the Preferred Location: ")

//   // await page.type(LinkedIN_Job_Input, job_requested)

//   // //> Page redirects to Obs as soon as job is entered so holding location for now
//   // await page.type(LinkedIN_Location_Input, job_requested_location)

//   // await page.waitForNavigation({ waitUntil: ['domcontentloaded', 'networkidle2'] })

//   await page.waitForSelector("input[id^='jobs-search-box-keyword-id-']");
//   await page.waitForSelector("input[id^='jobs-search-box-location-id-']");

//   console.log("Landed on LinkedIn Jobs Page");

//   let job_requested = prompt("Enter the Job Role: ");
//   let job_requested_location = prompt("Enter the Preferred Location: ");


//   const LinkedIN_Job_Input = await page.$("input[id^='jobs-search-box-keyword-id-']");
//   const LinkedIN_Location_Input = await page.$("input[id^='jobs-search-box-location-id-']");

//   if (LinkedIN_Job_Input) {
//     await LinkedIN_Job_Input.click({ clickCount: 3 }); // Select all text
//     await LinkedIN_Job_Input.type(job_requested, { delay: 100 });
//   }

//   if (LinkedIN_Location_Input) {
//     await LinkedIN_Location_Input.click({ clickCount: 3 });
//     await LinkedIN_Location_Input.type(job_requested_location, { delay: 100 });
//   }

//   await LinkedIN_Job_Input.press("Enter");

//   await page.waitForSelector(".job-card-container");

//   const searchResultsURL = page.url();

//   await page.goto(searchResultsURL)
//   console.log("Search Results URL:", searchResultsURL);

//   console.log("Search executed successfully!");


// })();





(async () => {

  const browser = await puppeteer.launch({ defaultViewport: null, headless: false });
  const page = await browser.newPage();

  await page.goto("https://www.linkedin.com/login");
  await page.waitForSelector("#username", { visible: true });
  await page.waitForSelector("#password", { visible: true });
  await page.waitForSelector("button[type=submit]", { visible: true });

  await page.type("#username", "jobsfetch1@gmail.com", { delay: 150 });
  await page.type("#password", "jobsfetch@linkedIN", { delay: 150 });

  await page.click("button[type=submit]");
  await page.waitForNavigation({ waitUntil: "domcontentloaded" });

  console.log("Searching For Job.....");
  await page.waitForSelector("li.global-nav__primary-item:nth-of-type(3)");
  await page.click("li.global-nav__primary-item:nth-of-type(3)", { waitUntil: ['domcontentloaded'] });

  await page.waitForSelector("input[id^='jobs-search-box-keyword-id-']");
  await page.waitForSelector("input[id^='jobs-search-box-location-id-']");

  console.log("Landed on LinkedIn Jobs Page");

  let job_requested = prompt("Enter the Job Role: ");
  let job_requested_location = prompt("Enter the Preferred Location: ");

  const LinkedIN_Job_Input = await page.$("input[id^='jobs-search-box-keyword-id-']");
  const LinkedIN_Location_Input = await page.$("input[id^='jobs-search-box-location-id-']");

  if (LinkedIN_Job_Input) {
    await LinkedIN_Job_Input.click({ clickCount: 3 }); // Select all text
    await LinkedIN_Job_Input.type(job_requested, { delay: 100 });
  }

  if (LinkedIN_Location_Input) {
    await LinkedIN_Location_Input.click({ clickCount: 3 });
    await LinkedIN_Location_Input.type(job_requested_location, { delay: 100 });
  }

  await LinkedIN_Job_Input.press("Enter");

  await page.waitForSelector(".job-card-container");

  console.log("Fetching job data...");

  // Fetch job data
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

  // Save the data to a JSON file
  fs.writeFileSync("LinkedIn_jobs.json", JSON.stringify(jobs, null, 2));
  console.log("Jobs data saved to jobs.json");

  console.log("Search executed successfully!");

  await browser.close();
})();