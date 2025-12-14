// import pool from "./db_setup.js";

// /**
//  * Get job_title from job_requirements using job_id
//  * @param {string} jobId
//  * @returns {string|null}
//  */
// export async function getJobTitleByJobId(jobId) {
//   if (!jobId) return null;

//   const result = await pool.query(
//     `
//     SELECT job_title
//     FROM job_requirements
//     WHERE job_id = $1
//     LIMIT 1
//     `,
//     [jobId]
//   );

//   return result.rows.length > 0 ? result.rows[0].job_title : null;
// }
