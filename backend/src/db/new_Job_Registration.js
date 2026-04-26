import pool from "./db_setup.js";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";

// ✅ NEW SCRAPER
import { runScrapeForJob } from "../scrapers/userScraper.js";

export const addNewJob = async (jobData, userId) => {
  const jobId = `job_${uuidv4()}`;

  if (!userId) {
    return { success: false, error: "User ID missing" };
  }

  try {
    await pool.query("BEGIN");

    // 1️⃣ Ensure user
    await pool.query(
      `
      INSERT INTO users (user_id, jid_array)
      VALUES ($1, ARRAY[]::text[])
      ON CONFLICT (user_id) DO NOTHING
      `,
      [userId]
    );

    // 2️⃣ Insert job
    await pool.query(
      `
      INSERT INTO job_requirements
      (
        job_id,
        job_title,
        location,
        can_remote,
        is_fresher,
        will_intern,
        job_added_date
      )
      VALUES ($1, $2, $3, $4, $5, $6, NOW())
      `,
      [
        jobId,
        jobData.job_title,
        jobData.location,
        jobData.canRemote ?? false,
        jobData.isFresher ?? false,
        jobData.willIntern ?? false,
      ]
    );

    // 3️⃣ Attach job to user
    await pool.query(
      `
      UPDATE users
      SET jid_array = ARRAY_APPEND(jid_array, $1)
      WHERE user_id = $2
      `,
      [jobId, userId]
    );

    await pool.query("COMMIT");

    console.log(`✅ Job ${jobId} added for user ${userId}`);

    // 🔥 NEW FLOW (USER SCRAPER)
    console.log(`🔥 Starting USER scraper for: ${jobId}`);

    runScrapeForJob(jobId).catch((err) =>
      console.error("❌ User scraper failed:", err)
    );

    return { success: true, jobId };
  } catch (error) {
    await pool.query("ROLLBACK");
    console.error("❌ Error adding job:", error.message);
    return { success: false, error: error.message };
  }
};