import pool from "./db_setup.js";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";

// ✅ NEW SCRAPER
import { runScrapeForJob } from "../scrapers/userScraper.js";

export const addNewJob = async (jobData, userId) => {
  const jobReqId = `job_${uuidv4()}`;

  if (!userId) {
    return { success: false, error: "User ID missing" };
  }

  try {
    await pool.query("BEGIN");

    // 1️⃣ Ensure user
    await pool.query(
      `
      INSERT INTO users (user_id, job_req_id_array)
      VALUES ($1, ARRAY[]::varchar[])
      ON CONFLICT (user_id) DO NOTHING
      `,
      [userId],
    );

    // 2️⃣ Insert job
    await pool.query(
      `
      INSERT INTO job_requirements
      (
        job_req_id,
        user_id,
        job_title,
        location,
        is_remote,
        is_intern,
        is_fresher,
        added_date
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, NOW())
      `,
      [
        jobReqId,
        userId,
        jobData.job_title,
        jobData.location,
        jobData.is_remote ?? false,
        jobData.is_intern ?? false,
        jobData.isFresher ?? false,
      ],
    );

    // 3️⃣ Attach job to user
    await pool.query(
      `
      UPDATE users
      SET job_req_id_array = ARRAY_APPEND(job_req_id_array, $1)
      WHERE user_id = $2
      `,
      [jobReqId, userId],
    );

    await pool.query("COMMIT");

    console.log(`✅ Job ${jobReqId} added for user ${userId}`);

    // 🔥 NEW FLOW (USER SCRAPER)
    console.log(`🔥 Starting USER scraper for: ${jobReqId}`);

    runScrapeForJob(jobReqId).catch((err) =>
      console.error("❌ User scraper failed:", err),
    );

    return { success: true, jobReqId };
  } catch (error) {
    await pool.query("ROLLBACK");
    console.error("❌ Error adding job:", error.message);
    return { success: false, error: error.message };
  }
};
