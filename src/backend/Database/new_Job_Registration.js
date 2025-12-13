import pool from "./db_setup.js";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";
import scrapeJobs from "../Scrapers/scraperService.js";
import { getUserIdFromAuth0 } from "../../Auth/authHelper.js";
import { useAuth0 } from "@auth0/auth0-react";

export const addNewJob = async (jobData) => {
  const formattedDateTime = moment().format("YYYY-MM-DD HH:mm:ss");
  const jobId = `job_${uuidv4()}`;

  console.log("📌 Adding job at:", formattedDateTime);

  try {
    const userId = "0";
    console.log("Working on: ", userId);
    console.log(`✅ Authenticated user: ${userId}`);

    await pool.query("BEGIN");

    const jobQuery = `
            INSERT INTO job_requirements (job_id, job_added_date, job_title, location, can_remote, is_fresher, will_intern)
            VALUES ($1, $2, $3, $4, $5, $6, $7)
        `;
    await pool.query(jobQuery, [
      jobId,
      formattedDateTime,
      jobData.job_title,
      jobData.location,
      jobData.canRemote,
      jobData.isFresher,
      jobData.willIntern,
    ]);

    const userQuery = `
            UPDATE users
            SET jid_array = ARRAY_APPEND(jid_array, $1)
            WHERE user_id = $2
        `;
    const userUpdateResult = await pool.query(userQuery, [jobId, userId]);

    if (userUpdateResult.rowCount === 0) {
      throw new Error("❌ User does not exist in the database.");
    }

    await pool.query("COMMIT");

    console.log(
      `✅ Job added successfully with job_id: ${jobId} for user: ${userId}`
    );

    scrapeJobs(jobId).catch((err) => console.error("❌ Scraper failed:", err));

    return { success: true, jobId };
  } catch (error) {
    await pool.query("ROLLBACK");
    console.error("❌ Error adding job:", error.message);
    return { success: false, error: error.message };
  }
};
