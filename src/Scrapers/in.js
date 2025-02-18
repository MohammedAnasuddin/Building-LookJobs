import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();


  const { role, city, state } = await page.evaluate(() => {
    const role = prompt("Enter the job role (e.g., Full Stack Developer):");
    const city = prompt("Enter the city (e.g., Bangalore):");
    const state = prompt("Enter the state (e.g., Karnataka):");
    return { role, city, state };
  });

  if (!role || !city || !state) {
    console.log("Role, city, or state not provided. Exiting...");
    await browser.close();
    return;
  }


  const formattedRole = role.split(' ').join('+');
  const formattedLocation = `${city}%2C+${state}`;

  const url = `https://in.indeed.com/jobs?q=${formattedRole}&l=${formattedLocation}&from=searchOnHP%2Cwhatautocomplete`;

  await page.goto(url);

  await page.waitForSelector('.slider_item');

  const jobDetails = await page.evaluate(() => {
    const jobCards = document.querySelectorAll('.slider_item');
    const details = [];

    jobCards.forEach(card => {
      const title = card.querySelector('.jobTitle') ? card.querySelector('.jobTitle').innerText : null;
      const company = card.querySelector("span[data-testid='company-name']") ? card.querySelector("span[data-testid='company-name']").innerText : null;
      const location = card.querySelector("div[data-testid='text-location']") ? card.querySelector("div[data-testid='text-location']").innerText : null;

      if (title && company && location) {
        details.push({ title, company, location });
      }
    });

    return details;
  });

  console.log(jobDetails);

  await browser.close();
})();


// Version 2
// await Indeed_Job_Fetch(browser, job_requested, job_requested_location_City,job_requested_location_State)

async function Indeed_Job_Fetch(browser, job_requested, job_requested_location_City,job_requested_location_State) {
  browser = await puppeteer.launch({ 
   headless: false, 
   args: ['--no-sandbox', '--disable-setuid-sandbox'] 
 });

 const page = await browser.newPage();
 // Format the search query for the Indeed URL
 const formattedRole = job_requested.split(' ').join('+');
 const formattedLocation = `${job_requested_location_City}%2C+${job_requested_location_State}`;
 // const url = `https://in.indeed.com/jobs?q=${formattedRole}&l=${formattedLocation}&from=searchOnHP%2Cwhatautocomplete`;
 const url = `https://in.indeed.com`;

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