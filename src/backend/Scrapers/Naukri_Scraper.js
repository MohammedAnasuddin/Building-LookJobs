const naukriScraper = async (browser, jobRequirements) => {
  const page = await browser.newPage();
  page.setDefaultNavigationTimeout(60000);
  page.setDefaultTimeout(60000);

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  // 1. Construct Search URL with jobAge=1 (Last 24 hours)
  const jobTitle = jobRequirements.job_title.split(" ").join("-");
  const location = jobRequirements.location.toLowerCase();

  const naukriUrl = `https://www.naukri.com/${jobTitle.toLowerCase()}-jobs-in-${location}?jobAge=1`;

  console.log(`Navigating to Naukri URL: ${naukriUrl}`);
  await page.goto(naukriUrl, { waitUntil: "domcontentloaded" });

  // 2. Wait for job listings
  try {
    await page.waitForSelector(".srp-jobtuple-wrapper", { timeout: 10000 });
  } catch {
    console.log("No job listings found on Naukri");
    await page.close();
    return [];
  }

  await delay(800);

  // 3. Extract Job Data (UNCHANGED)
  const jobs = await page.evaluate(() => {
    const jobCards = document.querySelectorAll(".srp-jobtuple-wrapper");
    const today = new Date();
    const day = String(today.getDate()).padStart(2, "0");
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const year = today.getFullYear();
    const formattedDate = `${day}-${month}-${year}`;

    return Array.from(jobCards).map((card, index) => {
      const jobTitle = card.querySelector(".title")?.innerText.trim() || "N/A";
      const company =
        card.querySelector(".comp-name")?.innerText.trim() || "N/A";
      const location = card.querySelector(".loc")?.innerText.trim() || "N/A";
      const jobURL = card.querySelector("a.title")?.href || "N/A";
      const exp = card.querySelector(".exp")?.innerText.trim() || "";

      const isFresher =
        exp.toLowerCase().includes("0-") ||
        exp.toLowerCase().includes("fresher");

      return {
        job_id: `NAUKRI-${jobURL}` || `NAUKRI-${Math.random()}`,
        OpportunityID: `${formattedDate}-NKRI-${index}`,
        added_on: new Date().toISOString().split("T")[0],
        job_title: jobTitle,
        source: "Naukri",
        job_provider: company,
        job_location: location,
        job_URL: jobURL,
        Remote: location.toLowerCase().includes("remote"),
        Internship: jobTitle.toLowerCase().includes("intern"),
        Fresher: isFresher,
        isNew: true,
      };
    });
  });

  await delay(1500);
  await page.close();

  return jobs;
};

export default naukriScraper;
