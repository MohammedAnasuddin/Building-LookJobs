import pool from "./db_setup.js";

export const deleteJobRequirement = async ({
  userId,
  jobReqId,
}) => {
  const result = await pool.query(
    `
    DELETE FROM job_requirements
    WHERE job_req_id = $1
    AND user_id = $2

    RETURNING *;
    `,
    [jobReqId, userId]
  );

  return result.rows[0];
};