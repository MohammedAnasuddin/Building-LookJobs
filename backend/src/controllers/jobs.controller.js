import {
  getJobUpdatesService,
  createJobService,
} from "../services/jobs.service.js";

import { validateJob } from "../utils/validate.js";

export const getJobUpdates = async (req, res) => {
  const { jobId } = req.params;

  if (!jobId) {
    return res.status(400).json({ message: "Job ID is required" });
  }

  try {
    const result = await getJobUpdatesService(jobId);
    return res.json(result);
  } catch (err) {
    return res.status(500).json({ message: "Failed to fetch jobs" });
  }
};

export const createJob = async (req, res) => {
  const userId = req.user.sub; 
  const jobData = req.body;

  // 🔥 VALIDATION HERE
  const error = validateJob(jobData);

  if (error) {
    return res.status(400).json({ message: error });
  }

  if (!userId) {
    return res.status(400).json({ message: "User ID required" });
  }

  try {
    const result = await createJobService(jobData, userId);

    if (result.success) {
      return res.status(201).json({
        message: "Job added successfully!",
        jobId: result.jobId,
      });
    }

    return res.status(500).json({ message: result.error });
  } catch (err) {
    return res.status(500).json({ message: "Error creating job" });
  }
};
