const indeedScraper = async (browser, jobRequirements) => {
  const page = await browser.newPage();
  page.setDefaultNavigationTimeout(60000);
  page.setDefaultTimeout(60000);

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  // 1. Construct Search URL
  const jobTitle = encodeURIComponent(jobRequirements.job_title);
  const location = encodeURIComponent(jobRequirements.location);
  const indeedUrl = `https://in.indeed.com/jobs?q=${jobTitle}&l=${location}`;

  console.log(`Navigating to Indeed URL: ${indeedUrl}`);
  await page.goto(indeedUrl, { waitUntil: "domcontentloaded" });

  // 2. Wait for job listings
  try {
    await page.waitForSelector(".job_seen_beacon", { timeout: 10000 });
  } catch {
    console.log("No job listings found on Indeed");
    await page.close();
    return [];
  }

  // --------------------------------------------------
  // APPLY FILTER: DATE POSTED → LAST 24 HOURS
  // --------------------------------------------------

  try {
    // Step 1: Wait for filter button
    const button = await page.waitForSelector("#fromAge_filter_button", {
      visible: true,
    });

    // Step 2: Click using mouse (real interaction)
    const box = await button.boundingBox();
    await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
    await page.mouse.down();
    await delay(80);
    await page.mouse.up();

    // Step 3: Wait until dropdown is actually opened
    await page.waitForFunction(
      () => {
        const btn = document.getElementById("fromAge_filter_button");
        return btn && btn.getAttribute("aria-expanded") === "true";
      },
      { timeout: 5000 }
    );

    // Step 4: Wait until menu option is visible
    await page.waitForSelector(
      "a[role='menuitem'][aria-label='Last 24 hours']",
      { visible: true, timeout: 5000 }
    );

    // Step 5: Click "Last 24 hours"
    await page.evaluate(() => {
      const option =
        document.querySelector(
          "a[role='menuitem'][aria-label='Last 24 hours']"
        ) || document.querySelector("a[data-testid='selection-pill-option-0']");

      if (option) option.click();
    });

    // Step 6: Allow results to refresh
    await delay(1500);
  } catch (err) {
    console.log("Indeed date filter failed:", err.message);
  }

  // Ensure refreshed results
  await page.waitForSelector(".job_seen_beacon", { visible: true });
  await delay(800);

  // --------------------------------------------------
  // DATA EXTRACTION
  // --------------------------------------------------

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
        card.querySelector("[data-testid='company-name']")?.innerText.trim() ||
        "N/A";

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
        source: "Indeed",
        job_URL: jobURL,
        Remote: isRemote,
        Internship: title.toLowerCase().includes("intern"),
        Fresher: title.toLowerCase().includes("fresher"),
        isNew: true,
      };
    });
  });

  await delay(2000);
  await page.close();

  return jobs;
};

export default indeedScraper;
