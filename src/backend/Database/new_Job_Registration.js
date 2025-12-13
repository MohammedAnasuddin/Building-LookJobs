import pool from "./db_setup.js";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";
import scrapeJobs from "../Scrapers/scraperService.js";

export const addNewJob = async (jobData, userId) => {
  const formattedDateTime = moment().format("YYYY-MM-DD HH:mm:ss");
  const jobId = `job_${uuidv4()}`;

  if (!userId) {
    return { success: false, error: "User ID missing" };
  }

  try {
    await pool.query("BEGIN");

    /* 1️⃣ ENSURE USER EXISTS (IDEMPOTENT) */
    await pool.query(
      `
      INSERT INTO users (user_id, jid_array)
      VALUES ($1, ARRAY[]::text[])
      ON CONFLICT (user_id) DO NOTHING
      `,
      [userId]
    );

    /* 2️⃣ INSERT JOB */
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

    /* 3️⃣ ATTACH JOB TO USER */
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

    // fire & forget
    scrapeJobs(jobId).catch((err) => console.error("❌ Scraper failed:", err));

    return { success: true, jobId };
  } catch (error) {
    await pool.query("ROLLBACK");
    console.error("❌ Error adding job:", error.message);
    return { success: false, error: error.message };
  }
};
