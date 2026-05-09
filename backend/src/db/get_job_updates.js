import pool from "./db_setup.js";

export const getJobUpdates = async ({ userId, jobReqId }) => {
  const result = await pool.query(
    `
    SELECT
      jud.id,
      jud.job_title,
      jud.company,
      jud.job_provider,
      jud.job_location,
      jud.job_url,
      jud.added_on,
      jud.is_remote,
      jud.is_fresher,
      jud.is_internship

    FROM job_update_details jud

    JOIN job_requirements jr
    ON jud.job_req_id = jr.job_req_id

    WHERE
      jud.job_req_id = $1
      AND jr.user_id = $2

    ORDER BY jud.added_on DESC
    `,
    [jobReqId, userId],
  );

  return result.rows;
};
