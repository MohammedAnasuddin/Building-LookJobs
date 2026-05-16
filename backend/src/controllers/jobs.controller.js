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

  // =========================
  // VALIDATION
  // =========================

  const error = validateJob(jobData);

  if (error) {
    return res.status(400).json({
      success: false,
      message: error,
    });
  }

  if (!userId) {
    return res.status(400).json({
      success: false,
      message: "User ID required",
    });
  }

  try {
    const result = await createJobService(jobData, userId);

    if (result.success) {
      return res.status(201).json({
        success: true,

        message: "Job requirement created",

        data: {
          job_req_id: result.jobReqId,

          scrape_status: "pending",
        },
      });
    }

    return res.status(500).json({
      success: false,
      message: result.error,
    });
  } catch (err) {
    console.error("❌ Create job error:", err);

    return res.status(500).json({
      success: false,
      message: "Error creating job",
    });
  }
};
