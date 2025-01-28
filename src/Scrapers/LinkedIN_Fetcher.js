import puppeteer from 'puppeteer-extra';
import StealthPlugin from "puppeteer-extra-plugin-stealth";
puppeteer.use(StealthPlugin());


(async () => {
    //   //todo: Fetch the jobs from the url 
    //   //Tip: To check puppeteer is acting as bot ot launch this site using it https://bot.sannysoft.com/
      const browser = await puppeteer.launch({defaultViewport: null,headless:false});
      const page = await browser.newPage();

    //>LinlkedIN : URL to Testing
      // await page.goto('https://www.linkedin.com/jobs/search/?currentJobId=4120267872&f_E=1%2C2&geoId=105556991&keywords=full%20stack%20developer&origin=JOB_SEARCH_PAGE_JOB_FILTER&refresh=true')

    await page.goto("https://www.linkedin.com/login");
    await page.waitForSelector("#username",{visible: true})
    await page.waitForSelector("#password",{visible: true})
    await page.waitForSelector("button[type=submit]",{visible: true})

    await page.type("#username","jobsfetch1@gmail.com",{delay: 100})
    await page.type("#password","'''''''''@linkedIN",{delay: 100})

    await page.click("button[type=submit]")

    await page.waitForNavigation({ waitUntil: "networkidle2" });

    })();
    
    
    
 
    