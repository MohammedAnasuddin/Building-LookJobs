import pool from "../db/db_setup.js";

import { getJobUpdatesService } from "../services/jobUpdate.service.js";

export const getJobUpdatesController = async (req, res) => {
  try {
    const userId = req.user.sub;

    const { id } = req.params;

    // =========================
    // GET REQUIREMENT STATUS
    // =========================

    const requirementResult = await pool.query(
      `
          SELECT
            scrape_status,
            scrape_stage,
            progress

          FROM job_requirements

          WHERE
            job_req_id = $1
            AND user_id = $2
          `,
      [id, userId],
    );

    if (requirementResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Requirement not found",
      });
    }

    const requirement = requirementResult.rows[0];

    // =========================
    // GET JOB UPDATES
    // =========================

    const updates = await getJobUpdatesService({
      userId,
      jobReqId: id,
    });

    // =========================
    // SUCCESS RESPONSE
    // =========================

    return res.status(200).json({
      success: true,

      scrape_status: requirement.scrape_status,

      scrape_stage: requirement.scrape_stage,

      progress: requirement.progress,

      data: updates || [],
    });
  } catch (error) {
    console.error("❌ Error fetching updates:", error);

    return res.status(500).json({
      success: false,

      message: "Failed to fetch updates",
    });
  }
};
