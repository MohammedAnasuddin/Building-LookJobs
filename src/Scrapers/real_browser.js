import { connect } from "puppeteer-real-browser";

async function test() {
  try {
    // Establish connection with custom configuration
    const { browser, page } = await connect({
      headless: false, // Run in non-headless mode to visualize the browser
      args: [], // Additional launch arguments if needed
      customConfig: {}, // Custom browser configuration

      turnstile: true, // Enable handling of Cloudflare Turnstile challenges
      connectOption: {}, // Additional connection options

      disableXvfb: false, // Needed for non-headless environments on Linux
      ignoreAllFlags: false, // Don't ignore any flags

      // Uncomment and configure this if you're using a proxy
      /*
      proxy: {
        host: '<proxy-host>',
        port: '<proxy-port>',
        username: '<proxy-username>',
        password: '<proxy-password>',
      }
      */
    });

    // Navigate to the Indeed job search page
    await page.goto(
      "https://in.indeed.com/jobs?q=Full+Stack+Developer&l=Hyderabad%2C+Telangana&from=searchOnHP%2Cwhatautocomplete",
      { waitUntil: "networkidle2" }
    );

    // Wait for the job listings to load
    await page.waitForSelector("h1", { visible: true, timeout: 60000 });

    // Log the page title to confirm navigation
    const pageTitle = await page.title();
    console.log("Page Title:", pageTitle);

    // Close browser after task completion
    await browser.close();
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

test();
