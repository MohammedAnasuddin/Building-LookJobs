import pool from "./db_setup.js";

// /**
//  * Get job_title from job_requirements using job_req_id
//  * @param {string} jobReqId
//  * @returns {string|null}
//  */
export async function getJobTitleByJobId(jobReqId) {
  if (!jobReqId) return null;

  const result = await pool.query(
    `
    SELECT job_title
    FROM job_requirements
    WHERE job_req_id = $1
    LIMIT 1
    `,
    [jobReqId],
  );

  return result.rows.length > 0 ? result.rows[0].job_title : null;
}
