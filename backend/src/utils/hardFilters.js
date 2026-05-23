const SENIOR_WORDS = [
  "senior",
  "lead",
  "staff",
  "principal",
  "director",
  "head",
];

export const passesHardFilters = (job, requirements) => {
  const title = job.job_title?.toLowerCase() || "";

  // =========================
  // FRESHER FILTER
  // =========================

  if (requirements.is_fresher) {
    const isSenior = SENIOR_WORDS.some((word) => title.includes(word));

    if (isSenior) {
      console.log(`🚫 Senior rejected: ${job.job_title}`);

      return false;
    }
  }

  // =========================
  // INTERNSHIP FILTER
  // =========================

  if (requirements.is_intern) {
    const internshipWords = ["intern", "internship", "trainee"];

    const isInternship = internshipWords.some((word) => title.includes(word));

    if (!isInternship) {
      console.log(`🚫 Internship mismatch: ${job.job_title}`);

      return false;
    }
  }

  // =========================
  // LOCATION FILTER
  // =========================

  const reqLocation = requirements.location?.toLowerCase()?.trim();

  const jobLocation = job.job_location?.toLowerCase()?.trim() || "";

  // skip if remote requested
  if (!requirements.is_remote) {
    if (reqLocation && !jobLocation.includes(reqLocation)) {
      console.log(`🚫 Location mismatch: ${job.job_title}`);

      return false;
    }
  }

  return true;
};
