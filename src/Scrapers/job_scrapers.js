// import puppeteer from 'puppeteer-extra';
// import StealthPlugin from "puppeteer-extra-plugin-stealth";
// // puppeteer.use(StealthPlugin());

// import { connect } from 'puppeteer-real-browser'

// const { page, browser } = await connect()


// // (async () => {
// //   //todo: Fetch the jobs from the url 
// //   //Tip: To check puppeteer is acting as bot ot launch this site using it https://bot.sannysoft.com/
// //   const browser = await puppeteer.launch({defaultViewport: null,headless:false});
// //   await indeed_jobs_fetch(browser)

  



// //   // await browser.close();
// // })();



// async function indeed_jobs_fetch(){
//   let indeed_job_url ="https://in.indeed.com/jobs?q=full+stack+developer&l=Hyderabad%2C+Telangana&from=searchOnHP%2Cwhatautocomplete&vjk=1c11eabf7e946006"
//   const indeed_job_page = await browser.newPage();
//   await indeed_job_page.goto(indeed_job_url)
  
// }


//> Real browser Setup
import { connect } from 'puppeteer-real-browser'



async function test() {

    const { browser, page } = await connect({

        headless: false,

        args: [],

        customConfig: {},

        turnstile: true,

        connectOption: {},

        disableXvfb: false,
        ignoreAllFlags: false
        // proxy:{
        //     host:'<proxy-host>',
        //     port:'<proxy-port>',
        //     username:'<proxy-username>',
        //     password:'<proxy-password>'
        // }

    })
    for (let i = 0; i < 1; i++) {
      await page.goto('https://in.indeed.com/jobs?q=full+stack+developer&l=Hyderabad%2C+Telangana')
      await new Promise(resolve => setTimeout(resolve, 3000));
    }
    await browser.close();

}

test()



//>Stealth Boiler Plate
import puppeteer from 'puppeteer-extra';
import StealthPlugin from "puppeteer-extra-plugin-stealth";
puppeteer.use(StealthPlugin());


(async () => {
    //   //todo: Fetch the jobs from the url 
    //   //Tip: To check puppeteer is acting as bot ot launch this site using it https://bot.sannysoft.com/
      const browser = await puppeteer.launch({defaultViewport: null,headless:false});
      await indeed_jobs_fetch(browser)
    
      
    
    
    
    // //   // await browser.close();
    })();
    
    
    
    async function indeed_jobs_fetch(browser){
    //   let indeed_job_url ="https://in.indeed.com/jobs?q=full+stack+developer&l=Hyderabad%2C+Telangana&from=searchOnHP%2Cwhatautocomplete&vjk=1c11eabf7e946006"
    //   const indeed_job_page = await browser.newPage();
    //   await indeed_job_page.goto(indeed_job_url)

    const page = await browser.newPage();

    for (let i = 0; i < 10; i++) {
      const browser = await puppeteer.launch({defaultViewport: null,headless:false});
        await page.goto('https://in.indeed.com/jobs?q=full+stack+developer&l=Hyderabad%2C+Telangana')
        await new Promise(resolve => setTimeout(resolve, 3000));
        await browser.close()
      }
    }
    
  