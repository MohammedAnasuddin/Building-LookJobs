/**
 * URL Builders for all 4 platforms.
 * All filters applied via URL params — no UI interaction needed.
 */

/**
 * LinkedIn Jobs Search URL
 * f_TPR=r86400 → past 24 hours
 * f_E=1 → Internship, f_E=2 → Entry Level
 * f_WT=1 → On-site, f_WT=2 → Remote, f_WT=3 → Hybrid
 */
export const buildLinkedInUrl = (req) => {
  const experienceLevels = [];
  if (req.will_intern) experienceLevels.push("1");
  if (req.is_fresher) experienceLevels.push("2");

  const params = new URLSearchParams({
    keywords: req.job_title,
    location: req.location,
    f_TPR: "r86400",
    f_WT: "1,2",
    sortBy: "DD",
  });

  if (experienceLevels.length > 0) {
    params.set("f_E", experienceLevels.join(","));
  }

  return `https://www.linkedin.com/jobs/search/?${params.toString()}`;
};

/**
 * Indeed Jobs Search URL
 * fromage=1 → last 24 hours
 * jt=internship → internship job type
 * explvl=ENTRY_LEVEL → fresher/entry level
 */
export const buildIndeedUrl = (req) => {
  const params = new URLSearchParams({
    q: req.job_title,
    l: req.location,
    fromage: "1",
    sort: "date",
  });

  if (req.will_intern) params.set("jt", "internship");
  if (req.is_fresher) params.set("explvl", "ENTRY_LEVEL");
  if (req.can_remote) params.set("remotejob", "032b3046-06a3-4876-8dfd-474eb5e7ed11");

  return `https://in.indeed.com/jobs?${params.toString()}`;
};

/**
 * Naukri Jobs Search URL
 * jobAge=1 → last 24 hours
 * experience=0 → fresher
 * wfhType=2 → remote
 * jobType=3 → internship
 */
export const buildNaukriUrl = (req) => {
  const jobTitle = req.job_title.trim().toLowerCase().split(" ").join("-");
  const location = req.location.trim().toLowerCase();

  const params = new URLSearchParams({ jobAge: "1" });

  if (req.is_fresher) params.set("experience", "0");
  if (req.can_remote) params.set("wfhType", "2");
  if (req.will_intern) params.set("jobType", "3");

  return `https://www.naukri.com/${jobTitle}-jobs-in-${location}?${params.toString()}`;
};

/**
 * Internshala URL
 * Switches between /jobs/ and /internships/ based on will_intern flag
 * sort_by=posted_date → latest first
 */
export const buildInternshalaUrl = (req) => {
  const jobTitle = req.job_title.trim().toLowerCase().split(" ").join("-");
  const location = req.location.trim().toLowerCase();

  if (req.will_intern) {
    return `https://internshala.com/internships/${jobTitle}-internship-in-${location}/?sort_by=posted_date`;
  }

  return `https://internshala.com/jobs/${jobTitle}-jobs-in-${location}/?sort_by=posted_date`;
};
