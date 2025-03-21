// import fs from "fs";
// import puppeteer from 'puppeteer-extra';
// import StealthPlugin from "puppeteer-extra-plugin-stealth";
// puppeteer.use(StealthPlugin());

// const USERNAME = "lookjobs.project@gmail.com";
// const PASSWORD = "lookJObs@linkedIN";
// const linkedInScraper = async (browser, jobRequirements) => {
//    const USER_DATA_DIR = "user";
//       const browser_1 = await puppeteer.launch({
//         headless: false, // Set to true for production (false for debugging)
//         userDataDir: USER_DATA_DIR, // Pre-saved user directory
//         args: [
//           "--no-sandbox",
//           "--disable-setuid-sandbox",
//           "--disable-dev-shm-usage",
//           "--disable-gpu",
//         ],
//       });
//   const page = await browser_1.newPage();
//   page.setDefaultNavigationTimeout(60000); // ✅ Sets default navigation timeout to 60 sec
// page.setDefaultTimeout(60000); // ✅ Sets default timeout for all actions

//   await page.goto("https://www.linkedin.com/login", { waitUntil: "domcontentloaded" });

//   // **Check if already logged in**
//   if (page.url().includes("/login")) {
//       console.log("🔑 Logging into LinkedIn...");
//       await page.type("#username", USERNAME, { delay: 150 });
//       await page.type("#password", PASSWORD, { delay: 150 });
  
//       await Promise.all([
//           page.click("button[type=submit]"),
//           page.waitForNavigation({ waitUntil: "domcontentloaded" }),
//       ]);
  
//       console.log("✅ Successfully Logged In!");
//   } else {
//       console.log("✅ Already Logged In! Skipping login...");
//   }
  
//   // **Ensure it’s on Jobs Page, not Feed**
//   if (page.url().includes("/feed/")) {
//       console.log("🔄 Redirected to feed. Going to Jobs Page...");
//       await page.goto("https://www.linkedin.com/jobs/", { waitUntil: "domcontentloaded" });
//   } else {
//       console.log("✅ Already on correct page!");
//   }

//   // **Wait for search fields**
//   console.log("🔍 Entering Job Search Criteria...");
//   await page.waitForSelector("input[id^='jobs-search-box-keyword-id-']", { visible: true });
//   await page.waitForSelector("input[id^='jobs-search-box-location-id-']", { visible: true });

//   const jobInput = await page.$("input[id^='jobs-search-box-keyword-id-']");
//   const locationInput = await page.$("input[id^='jobs-search-box-location-id-']");

//   if (jobInput) {
//     await jobInput.click({ clickCount: 3 });
//     console.log("Fond role search")
//     await jobInput.type("Full Stack Developer", { delay: 100 });
//   }
  
//   if (locationInput) {
//     await locationInput.click({ clickCount: 3 });
//     console.log("Fond role location")
//     await locationInput.type("Hyderabad", { delay: 100 });
//   }

//   await jobInput.press("Enter");
//   await page.waitForSelector(".job-card-container", { waitUntil: "domcontentloaded" });

//   console.log("✅ Landed on LinkedIn Jobs Page");


//   // **Apply Filters**
//   const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
//   await page.waitForSelector("li.search-reusables__primary-filter");
//   const searchFilters = await page.$$("li.search-reusables__primary-filter");

//   // **Apply "Past 24 Hours" Filter**
//   console.log("🕒 Applying 'Past 24 Hours' filter...");
//   await searchFilters[1].click();
//   await page.waitForSelector("li.search-reusables__collection-values-item input");
//   const past24Hours = await page.$$("li.search-reusables__collection-values-item input");
//   await past24Hours[3].click(); // Select "Past 24 Hours"
//   await delay(500);
//   await searchFilters[1].$("div[class^=reusable-search-filters-buttons] button:nth-of-type(2)").then(btn => btn.click());
//   await delay(500);

  

//   //** Applying Experience */


//   // **Apply Experience Filters**
// // if (jobRequirements.is_fresher || jobRequirements.will_Intern) {
// if (true) {
//   console.log("🎓 Applying Fresher/Internship filter...");

//   // **Re-fetch search filters to avoid stale elements**
//   await page.waitForSelector("li.search-reusables__primary-filter", { visible: true });
//   let updatedSearchFilters = await page.$$("li.search-reusables__primary-filter");

//   // **Click on "Experience Level" filter**
//   await updatedSearchFilters[2].click();

//   // **Wait for the experience options to appear**
//   await page.waitForSelector("ul[class*=search-reusables__collection-values-container]", { waitUntil: "domcontentloaded" });

//   // **Click "Internship" if required**
//   // if (jobRequirements.will_Intern) {
//   if (true) {
//       const internCheckbox = await page.$("input[id='experience-1']");
//       if (internCheckbox) {
//           await internCheckbox.click();
//           console.log("✅ Selected Internship filter");
//       } else {
//           console.log("❌ Internship filter not found!");
//       }
//   }

//   // **Click "Entry Level" if required**
//   if (true) {
//       const fresherCheckbox = await page.$("input[id='experience-2']");
//       if (fresherCheckbox) {
//           await fresherCheckbox.click();
//           console.log("✅ Selected Entry Level filter");
//       } else {
//           console.log("❌ Entry Level filter not found!");
//       }
//   }

//   // **Wait before applying filters**
//   await delay(500);
//   await updatedSearchFilters[2].$("div[class^=reusable-search-filters-buttons] button:nth-of-type(2)").then(btn => btn.click());

//   // **Click "Show Results" button**
//   // const applyButton = await updatedSearchFilters[3].$("");
//   // if (applyButton) {
//   //     await applyButton.click();
//   //     await delay(1000);
//   //     console.log("🎯 Applied Experience Filters");
//   //   } else {
//   //     console.log("❌ 'Show Results' button not found!");
//   //   }
//   }

//   await delay(1000);

//   // **Apply Remote Filters**
// // if (jobRequirements.canRemote) {
// if (true) {
//     console.log("🌍 Applying Remote filter...");

//     // Wait for filter menu to appear
//     await page.waitForSelector("li.search-reusables__primary-filter", { visible: true });

//     // Click "Workplace Type" filter
//     const remoteFilter = await page.$$("li.search-reusables__primary-filter");
//     await remoteFilter[4].click();

//     // Wait for the filter options
//     await page.waitForSelector("ul[class*=search-reusables__collection-values-container]",  { waitUntil: "domcontentloaded" });

//     // **Click On-site & Remote checkboxes**
//     await page.click("input[id='workplaceType-1']"); // On-site (mandatory)
//     await page.click("input[id='workplaceType-2']");

//   // **Wait before applying filters**
//   await delay(500);

//   // **Click "Show Results" button**
//   await remoteFilter[4].$("div[class^=reusable-search-filters-buttons] button:nth-of-type(2)").then(btn => btn.click());
//   // if (applyButton) {
//   //     await applyButton.click();
//   //     console.log("🎯 Applied Remote Filters");
//   // } else {
//   //     console.log("❌ 'Show Results' button not found!");
//   // }
// }
// await delay(1000);
//   // **Wait for results**
//   await page.waitForSelector(".job-card-container",{ waitUntil: "domcontentloaded" });
//   console.log("📋 Fetching job data...");

//   // **Extract Job Data**
// const jobs = await page.evaluate(() => {
//     const jobCards = document.querySelectorAll(".job-card-container");
//     return Array.from(jobCards).map((card) => {
//       const spans = Array.from(card.getElementsByTagName("span")); // ✅ Convert HTMLCollection to an Array

//       return {
//         job_id: card.getAttribute("data-job-id") || "N/A",
//         OpportunityID: `OPP-${Math.floor(Math.random() * 100000)}`,
//         added_on: new Date().toISOString().split("T")[0],
//         job_title: spans[0]?.textContent?.trim() || "N/A",
//         job_provider: spans[2]?.textContent?.trim() || "N/A",
//         job_location: spans[3]?.textContent?.trim() || "N/A",
//         job_URL: card.querySelector("a")?.href || "N/A",
//         Remote: spans.some(span => span.textContent.includes("Remote")), // ✅ Works now!
//         Internship: spans.some(span => span.textContent.includes("Internship")),
//         Fresher: spans.some(span => span.textContent.includes("Entry Level")),
//         isNew: true
//       };
//     });
// });


//   // **Save JSON Data**
//   fs.writeFileSync("LinkedIn_jobs.json", JSON.stringify(jobs, null, 2));
//   console.log("LinkedIn_jobs.json", JSON.stringify(jobs, null, 2));
//   console.log("✅ Jobs data saved to LinkedIn_jobs.json");

//   // **Close only the page, not the browser**
//   await page.close();
//   console.log("🔒 Closed LinkedIn page");

//   return jobs;
// };

// let dummy_Data= 
//   {
//     job_id: 'job_519b5068-ad84-48ca-aab2-a5c567eef7f1',
//     job_title: 'Full Stack Developer',
//     location: 'Hyderabad',
//     can_remote: true,
//    "is_fresher": true,
//    "will_intern": true,
//     job_added_date: "2025-03-21T02:49:35.000Z"
//   }
  

//   await linkedInScraper(dummy_Data)


// export default linkedInScraper;
// * ----------------------Version -2  ---------------------------------------------------*


import fs from "fs";
import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";

puppeteer.use(StealthPlugin());

const USERNAME = "lookjobs.project@gmail.com";
const PASSWORD = "lookJObs@linkedIN";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const linkedInScraper = async (browser, jobRequirements) => {

  const page = await browser.newPage();
  page.setDefaultNavigationTimeout(60000);
  page.setDefaultTimeout(60000);

  await page.goto("https://www.linkedin.com/login", { waitUntil: "domcontentloaded" });
  await delay(500);

  // **Check if already logged in**
  if (page.url().includes("/login")) {
    console.log("🔑 Logging into LinkedIn...");
    await page.type("#username", USERNAME, { delay: 150 });
    await page.type("#password", PASSWORD, { delay: 150 });

    await Promise.all([
      page.click("button[type=submit]"),
      page.waitForNavigation({ waitUntil: "domcontentloaded" }),
    ]);

    console.log("✅ Successfully Logged In!");
  } else {
    console.log("✅ Already Logged In! Skipping login...");
  }

  await delay(500);

  // **Ensure it’s on Jobs Page, not Feed**
  if (page.url().includes("/feed/")) {
    console.log("🔄 Redirected to feed. Going to Jobs Page...");
    await page.goto("https://www.linkedin.com/jobs/", { waitUntil: "domcontentloaded" });
    await delay(500);
  } else {
    console.log("✅ Already on correct page!");
  }

  // **Wait for search fields**
  console.log("🔍 Entering Job Search Criteria...");
  await page.waitForSelector("input[id^='jobs-search-box-keyword-id-']", { visible: true });
  await page.waitForSelector("input[id^='jobs-search-box-location-id-']", { visible: true });

  const jobInput = await page.$("input[id^='jobs-search-box-keyword-id-']");
  const locationInput = await page.$("input[id^='jobs-search-box-location-id-']");

  if (jobInput) {
    await jobInput.click({ clickCount: 3 });
    console.log("Found role search");
    await jobInput.type(jobRequirements.job_title, { delay: 100 });
  }

  await delay(500);

  if (locationInput) {
    await locationInput.click({ clickCount: 3 });
    console.log("Found role location");
    await locationInput.type(jobRequirements.location, { delay: 100 });
  }

  await delay(500);
  await jobInput.press("Enter");
  await page.waitForSelector(".job-card-container", { waitUntil: "domcontentloaded" });

  console.log("✅ Landed on LinkedIn Jobs Page");
  await delay(500);

  // **Apply Filters**
  await page.waitForSelector("li.search-reusables__primary-filter");
  const searchFilters = await page.$$("li.search-reusables__primary-filter");

  // **Apply "Past 24 Hours" Filter**
  console.log("🕒 Applying 'Past 24 Hours' filter...");
  await searchFilters[1].click();
  await delay(500);

  await page.waitForSelector("li.search-reusables__collection-values-item input");
  const past24Hours = await page.$$("li.search-reusables__collection-values-item input");
  await past24Hours[3].click(); // Select "Past 24 Hours"
  await delay(500);

  await searchFilters[1].$("div[class^=reusable-search-filters-buttons] button:nth-of-type(2)").then(btn => btn.click());
  await delay(500);

  // **Apply Experience Filters**
  if (jobRequirements.is_fresher || jobRequirements.will_intern) {
    console.log("🎓 Applying Fresher/Internship filter...");

    await page.waitForSelector("li.search-reusables__primary-filter", { visible: true });
    let updatedSearchFilters = await page.$$("li.search-reusables__primary-filter");
    await delay(500);

    await updatedSearchFilters[2].click();
    await delay(500);

    await page.waitForSelector("ul[class*=search-reusables__collection-values-container]", { waitUntil: "domcontentloaded" });

    if (jobRequirements.will_intern) {
      const internCheckbox = await page.$("input[id='experience-1']");
      if (internCheckbox) {
        await internCheckbox.click();
        console.log("✅ Selected Internship filter");
      } else {
        console.log("❌ Internship filter not found!");
      }
    }

    if (jobRequirements.is_fresher) {
      const fresherCheckbox = await page.$("input[id='experience-2']");
      if (fresherCheckbox) {
        await fresherCheckbox.click();
        console.log("✅ Selected Entry Level filter");
      } else {
        console.log("❌ Entry Level filter not found!");
      }
    }

    await delay(500);
    await updatedSearchFilters[2].$("div[class^=reusable-search-filters-buttons] button:nth-of-type(2)").then(btn => btn.click());
    await delay(500);
  }

  // **Apply Remote Filters**
  if (jobRequirements.can_remote) {
    console.log("🌍 Applying Remote filter...");

    await page.waitForSelector("li.search-reusables__primary-filter", { visible: true });

    const remoteFilter = await page.$$("li.search-reusables__primary-filter");
    await remoteFilter[4].click();
    await delay(500);

    await page.waitForSelector("ul[class*=search-reusables__collection-values-container]", { waitUntil: "domcontentloaded" });

    await page.click("input[id='workplaceType-1']"); // On-site (mandatory)
    await delay(500);
    await page.click("input[id='workplaceType-2']");
    await delay(500);

    await remoteFilter[4].$("div[class^=reusable-search-filters-buttons] button:nth-of-type(2)").then(btn => btn.click());
    await delay(500);
  }

  // **Wait for results**
  await page.waitForSelector(".job-card-container", { waitUntil: "domcontentloaded" });
  console.log("📋 Fetching job data...");
  await delay(500);

  // **Extract Job Data**
  const jobs = await page.evaluate(() => {
    const jobCards = document.querySelectorAll(".job-card-container");
    return Array.from(jobCards).map((card) => {
      const spans = Array.from(card.getElementsByTagName("span"));

      return {
        job_id: card.getAttribute("data-job-id") || "N/A",
        OpportunityID: `OPP-${Math.floor(Math.random() * 100000)}`,
        added_on: new Date().toISOString().split("T")[0],
        job_title: spans[0]?.textContent?.trim() || "N/A",
        job_provider: spans[2]?.textContent?.trim() || "N/A",
        job_location: spans[3]?.textContent?.trim() || "N/A",
        job_URL: card.querySelector("a")?.href || "N/A",
        Remote: spans.some(span => span.textContent.includes("Remote")),
        Internship: spans.some(span => span.textContent.includes("Internship")),
        Fresher: spans.some(span => span.textContent.includes("Entry Level")),
        isNew: true
      };
    });
  });

  fs.writeFileSync("LinkedIn_jobs.json", JSON.stringify(jobs, null, 2));
  console.log("✅ Jobs data saved to LinkedIn_jobs.json");

  await page.close();
  console.log("🔒 Closed LinkedIn page");

  return jobs;
};

export default linkedInScraper;
