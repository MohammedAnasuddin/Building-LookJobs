import pool from "./db_setup.js";

export async function getJobUpdatesForJob(jobId) {
  try {
    const result = await pool.query(
      `
      SELECT jobs_by_date
      FROM job_scrape_results
      WHERE job_id = $1
      `,
      [jobId]
    );

    // If no scrape yet, return empty object
    if (result.rows.length === 0) {
      return { jobs_by_date: {} };
    }

    return {
      jobs_by_date: result.rows[0].jobs_by_date || {},
    };
  } catch (err) {
    console.error("❌ getJobUpdatesForJob error:", err);
    throw err;
  }
}
