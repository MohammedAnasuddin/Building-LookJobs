import puppeteer from "puppeteer";

const USER_DATA_DIR = "./user_data"; // Folder to store login session

(async () => {
  const browser = await puppeteer.launch({
    headless: false, // Open browser so you can log in
    userDataDir: USER_DATA_DIR, // Save session here
  });

  const page = await browser.newPage();
  await page.goto("https://www.linkedin.com/login");

  console.log("Log in manually, then close the browser. Your session will be saved.");

  setTimeout(()=>{},60000)

})();



