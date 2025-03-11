import puppeteer from 'puppeteer-extra';
import StealthPlugin from "puppeteer-extra-plugin-stealth";
import fetch from "node-fetch";
puppeteer.use(StealthPlugin());

import pkg from 'proxifly'; // Import entire module
const { Proxifly } = pkg; // Extract the class

const proxifly = new Proxifly({
  apiKey: '6vJJjr7YwCr5Guix9LA9hxqdaeX2yPPMJTAhVeWssuhF' // Replace with your actual API key
});

async function get_proxifly() {
  try {
    const options = {
      protocol: 'http', 
      anonymity: 'elite', 
      country: 'US', 
      https: true, 
      speed: 10000, 
      format: 'json', 
      quantity: 1, 
    };

    const proxy = await proxifly.getProxy(options);
    console.log('Fetched Proxy:', proxy);
    return proxy; // Return the proxy string
  } catch (error) {
    console.error('Error fetching proxy:', error);
  }
}

// Example usage:
(async () => {
  const proxy = await get_proxifly();
})();


// async function getProxy(){
//   while (true) {
//     try {
//       const response = await fetch("http:
//       const data = await response.json();

//       if (data.count > 0 && data.data.length > 0) {
//         console.log("Fetched Proxy:", data.data[0].ipPort, "Location: ",data.data[0].country);
//         return data.data[0].ipPort; 
//       }
//     } catch (error) {
//       console.error("Error fetching proxy, retrying...", error);
//     }

    
//     await new Promise(resolve => setTimeout(resolve, 2000));
//   }
  
// }


(async () => {
  
  let randomProxyUrl =   await getProxy()
  const browser = await puppeteer.launch({
        args: [`--proxy-server=103.88.239.179:84`]
    });
  const page = await browser.newPage();
  
  await page.goto('google.com',
    {waitUntil: 'networkidle2'
  });

  
  // await page.waitForSelector('iframe[src*="https:
  
  // const elementHandle = await page.$('iframe[src*="https:
  // const frame = await elementHandle.contentFrame(); 

  // if (frame) {
  //   console.log("Switched to Cloudflare iframe");

    
  //   await frame.waitForSelector('input[type="checkbox"]', { timeout: 15000 });
    
    
  //   await frame.click('input[type="checkbox"]');
  //   console.log("Checkbox clicked, Cloudflare should bypass now!");

    
  //   await page.waitForNavigation({ waitUntil: 'networkidle2', timeout: 30000 });
  //   console.log("Verification passed, proceeding...");
  // } else {
  //   console.log("Failed to switch to the iframe.");
  // }

  
  // console.log("Page Title:", await page.title());

  // await browser.close();
})();




































































































