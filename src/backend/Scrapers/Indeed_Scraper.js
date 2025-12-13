const indeedScraper = async (browser, jobRequirements) => {
  const page = await browser.newPage();
  page.setDefaultNavigationTimeout(60000);
  page.setDefaultTimeout(60000);

  // 1. Construct Search URL
  const jobTitle = encodeURIComponent(jobRequirements.job_title);
  const location = encodeURIComponent(jobRequirements.location);
  const indeedUrl = `https://in.indeed.com/jobs?q=${jobTitle}&l=${location}`;

  console.log(`🚀 Navigating to Indeed URL: ${indeedUrl}`);
  await page.goto(indeedUrl, { waitUntil: "domcontentloaded" });

  // 2. Wait for job listings
  try {
    await page.waitForSelector(".job_seen_beacon", { timeout: 10000 });
    console.log("📋 Fetching Indeed job data...");
  } catch (error) {
    console.log("❌ No job listings found on Indeed for the given criteria.");
    await page.close();
    return [];
  }

  // 3. Extract Job Data
  const jobs = await page.evaluate(() => {
    const jobCards = document.querySelectorAll(".job_seen_beacon");
    const today = new Date();
    const day = String(today.getDate()).padStart(2, "0");
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const year = today.getFullYear();
    const formattedDate = `${day}-${month}-${year}`;
    return Array.from(jobCards).map((card, index) => {
      const title = card.querySelector(".jobTitle")?.innerText.trim() || "N/A";
      const company =
        card.querySelector(".companyName")?.innerText.trim() || "N/A";
      const location =
        card.querySelector(".companyLocation")?.innerText.trim() || "N/A";
      const jobURL = card.querySelector("a")?.href || "N/A";
      const isRemote = location.toLowerCase().includes("remote");

      return {
        job_id:
          card.querySelector("a")?.dataset.jk || `INDEED-${Math.random()}`,
        OpportunityID: `${formattedDate}-INDD-${index}`,
        added_on: new Date().toISOString().split("T")[0],
        job_title: title,
        job_provider: company,
        job_location: location,
        job_URL: jobURL,
        Remote: isRemote,
        Internship: title.toLowerCase().includes("intern"),
        Fresher: title.toLowerCase().includes("fresher"),
        isNew: true,
      };
    });
  });

  await new Promise((resolve) => setTimeout(resolve, 2000)); // Wait 2s
  await page.close();
  console.log("🔒 Closed Indeed page");

  return jobs;
};

export default indeedScraper;
