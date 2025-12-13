const internshalaScraper = async (browser, jobRequirements) => {
  const page = await browser.newPage();
  page.setDefaultNavigationTimeout(60000);
  page.setDefaultTimeout(60000);

  // 1. Construct Search URL
  const jobTitle = jobRequirements.job_title.split(" ").join("-");
  const location = jobRequirements.location.toLowerCase();
  const internshalaUrl = `https://internshala.com/jobs/${jobTitle.toLowerCase()}-jobs-in-${location}/`;

  console.log(`🚀 Navigating to Internshala URL: ${internshalaUrl}`);
  await page.goto(internshalaUrl, { waitUntil: "domcontentloaded" });

  // 2. Wait for job listings
  try {
    await page.waitForSelector(".internship_meta", { timeout: 10000 });
    console.log("📋 Fetching Internshala job data...");
  } catch (error) {
    console.log(
      "❌ No job listings found on Internshala for the given criteria."
    );
    await page.close();
    return [];
  }

  // 3. Extract Job Data
  const jobs = await page.evaluate(() => {
    const jobCards = document.querySelectorAll(".internship_meta");
    const today = new Date();
    const day = String(today.getDate()).padStart(2, "0");
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const year = today.getFullYear();
    const formattedDate = `${day}-${month}-${year}`;
    return Array.from(jobCards).map((card, index) => {
      const jobTitle =
        card.querySelector(".job-internship-name")?.innerText.trim() || "N/A";
      const company =
        card.querySelector(".company-name")?.innerText.trim() || "N/A";
      const location =
        card.querySelector("#location_names span a")?.innerText.trim() || "N/A";
      const jobURL = card.querySelector(".view_detail_button")?.href || "N/A";
      const isRemote = location.toLowerCase().includes("remote");

      return {
        job_id: `INTSH-${jobURL.split("/").pop()}` || `INTSH-${Math.random()}`,
        OpportunityID: `${formattedDate}-INTSH-${index}`,
        added_on: new Date().toISOString().split("T")[0],
        job_title: jobTitle,
        job_provider: company,
        job_location: location,
        job_URL: jobURL,
        Remote: isRemote,
        Internship: jobTitle.toLowerCase().includes("internship"),
        Fresher: true, // Internshala jobs are often for freshers
        isNew: true,
      };
    });
  });

  await new Promise((resolve) => setTimeout(resolve, 2000)); // Wait 2s
  await page.close();
  console.log("🔒 Closed Internshala page");

  return jobs;
};

export default internshalaScraper;
