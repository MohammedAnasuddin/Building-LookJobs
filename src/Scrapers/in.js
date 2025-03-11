
import fs from 'fs';
import puppeteer from 'puppeteer-extra';
import StealthPlugin from "puppeteer-extra-plugin-stealth";
puppeteer.use(StealthPlugin());


(async () => {
    //   //todo: Fetch the jobs from the url 
    //   //Tip: To check puppeteer is acting as bot ot launch this site using it https://bot.sannysoft.com/
      const browser = await puppeteer.launch({defaultViewport: null,headless:false});
      await Indeed_Job_Fetch(browser,'Full Stack Developer', 'Hyderabad','Telangana')

     await browser.close();
    })();
// (async () => {
//   const browser = await puppeteer.launch({ headless: false });
//   const page = await browser.newPage();


//   const { role, city, state } = await page.evaluate(() => {
//     const role = prompt("Enter the job role (e.g., Full Stack Developer):");
//     const city = prompt("Enter the city (e.g., Bangalore):");
//     const state = prompt("Enter the state (e.g., Karnataka):");
//     return { role, city, state };
//   });

//   if (!role || !city || !state) {
//     console.log("Role, city, or state not provided. Exiting...");
//     await browser.close();
//     return;
//   }


//   const formattedRole = role.split(' ').join('+');
//   const formattedLocation = `${city}%2C+${state}`;

//   const url = `https://in.indeed.com/jobs?q=${formattedRole}&l=${formattedLocation}&from=searchOnHP%2Cwhatautocomplete`;

//   await page.goto(url);

//   await page.waitForSelector('.slider_item');

//   const jobDetails = await page.evaluate(() => {
//     const jobCards = document.querySelectorAll('.slider_item');
//     const details = [];

//     jobCards.forEach(card => {
//       const title = card.querySelector('.jobTitle') ? card.querySelector('.jobTitle').innerText : null;
//       const company = card.querySelector("span[data-testid='company-name']") ? card.querySelector("span[data-testid='company-name']").innerText : null;
//       const location = card.querySelector("div[data-testid='text-location']") ? card.querySelector("div[data-testid='text-location']").innerText : null;

//       if (title && company && location) {
//         details.push({ title, company, location });
//       }
//     });

//     return details;
//   });

//   console.log(jobDetails);

//   await browser.close();
// })();


// Version 2


async function Indeed_Job_Fetch( browser, job_requested, job_requested_location_City,job_requested_location_State) {

 const page = await browser.newPage();

 // Format the search query for the Indeed URL
 const formattedRole = job_requested.split(' ').join('+');
 const formattedLocation = `${job_requested_location_City}%2C+${job_requested_location_State}`;
 const url = `https://in.indeed.com/jobs?q=${formattedRole}&l=${formattedLocation}`;
 console.log(url);
 await page.goto(url,{ waitUntil: "networkidle2" });
 //>check for by[passing]
await  pauseExecution();
const h1Text = await page.$eval("h1", (element) => element.innerText);
console.log("Page H1 Text:", h1Text);

if (h1Text.includes("Additional Verification Required")) {
  console.log("Cloudflare verification detected!");

  // Wait for the iframe to appear
  await page.waitForSelector('iframe[src*="challenges.cloudflare.com"]', { timeout: 30000 });

  const frames = page.frames();
  const cfFrame = frames.find(frame => frame.url().includes("challenges.cloudflare.com"));

  if (cfFrame) {
    console.log("Cloudflare iframe found.");

    // Attempt to click the checkbox inside the iframe
    await cfFrame.waitForSelector('input[type="checkbox"]', { timeout: 10000 });
    await cfFrame.click('input[type="checkbox"]');

    console.log("Checkbox clicked inside iframe.");
  } else {
    console.log("Cloudflare iframe not found.");
  }

  // Wait for the page to reload after verification
  await page.waitForNavigation({ waitUntil: "networkidle2" });
}

// Proceed with scraping after bypass
console.log("Verification bypassed, proceeding...");
 



//  Wait for job cards to load
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

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function pauseExecution() {
  console.log("Execution paused.");
  await delay(300000); // 5 minutes = 300000 milliseconds
  console.log("Execution resumed.");
}
