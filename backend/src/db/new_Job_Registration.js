import pool from "./db_setup.js";

import { v4 as uuidv4 } from "uuid";

// ✅ USER SCRAPER
import { runScrapeForJob } from "../scrapers/userScraper.js";

export const addNewJob = async (jobData, userId) => {
  const jobReqId = `jid_${uuidv4()}`;

  if (!userId) {
    return {
      success: false,
      error: "User ID missing",
    };
  }

  try {
    await pool.query("BEGIN");

    // =========================
    // ENSURE USER
    // =========================

    await pool.query(
      `
        INSERT INTO users (user_id)
        VALUES ($1)

        ON CONFLICT (user_id)
        DO NOTHING
        `,
      [userId],
    );

    // =========================
    // INSERT REQUIREMENT
    // =========================

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
          added_date,
          scrape_status
        )

        VALUES (
          $1, $2, $3, $4,
          $5, $6, $7,
          NOW(),
          'pending'
        )
        `,
      [
        jobReqId,
        userId,
        jobData.job_title,
        jobData.location,
        jobData.is_remote ?? false,
        jobData.is_intern ?? false,
        jobData.is_fresher ?? false,
      ],
    );

    // =========================
    // OPTIONAL CACHE ARRAY
    // =========================

    await pool.query(
      `
        UPDATE users

        SET job_req_id_array =
          ARRAY_APPEND(
            COALESCE(
              job_req_id_array,
              ARRAY[]::varchar[]
            ),
            $1
          )

        WHERE user_id = $2
        `,
      [jobReqId, userId],
    );

    await pool.query("COMMIT");

    console.log(`✅ Job requirement ${jobReqId} added`);

    // =========================
    // ASYNC SCRAPE
    // =========================

    runScrapeForJob(jobReqId).catch((err) =>
      console.error("❌ User scraper failed:", err),
    );

    return {
      success: true,
      jobReqId,
    };
  } catch (error) {
    await pool.query("ROLLBACK");

    console.error("❌ Error adding job:", error.message);

    return {
      success: false,
      error: error.message,
    };
  }
};
