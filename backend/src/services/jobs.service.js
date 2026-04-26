import { getJobUpdatesForJob } from "../db/get_updates.js";
import { addNewJob } from "../db/new_Job_Registration.js";

export const getJobUpdatesService = async (jobId) => {
  return await getJobUpdatesForJob(jobId);
};

export const createJobService = async (jobData, userId) => {
  return await addNewJob(jobData, userId);
};