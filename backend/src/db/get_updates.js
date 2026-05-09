import pool from "./db_setup.js";

export async function getJobUpdatesForJob(jobReqId) {
  try {
    const result = await pool.query(
      `
      SELECT *
      FROM job_update_details
      WHERE job_req_id = $1
      ORDER BY added_on DESC
      `,
      [jobReqId],
    );

    return result.rows;
  } catch (err) {
    console.error("❌ getJobUpdatesForJob error:", err);
    throw err;
  }
}
