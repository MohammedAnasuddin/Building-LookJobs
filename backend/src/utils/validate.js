export const validateJob = (data) => {
  if (!data.job_title) return "Job title required";
  if (!data.location) return "Location required";

  return null;
};