
import puppeteer from 'puppeteer-extra';
import StealthPlugin from "puppeteer-extra-plugin-stealth";
puppeteer.use(StealthPlugin());

const USER_DATA_DIR = "./user";

(async () => {
    //   //todo: Fetch the jobs from the url 
    //   //Tip: To check puppeteer is acting as bot ot launch this site using it https://bot.sannysoft.com/
    const browser = await puppeteer.launch({
      headless: false, // Open browser so you can log in
      userDataDir: USER_DATA_DIR, // Save session here
    });
  
    const page = await browser.newPage();
   
   
  
    console.log("Log in manually, then close the browser. Your session will be saved.");
    })();
