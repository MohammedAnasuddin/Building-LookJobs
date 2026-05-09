import pool from "./db_setup.js";

export const createJobRequirement = async ({
  jobReqId,
  userId,
  job_title,
  location,
  is_remote,
  is_intern,
  is_fresher,
}) => {
  const result = await pool.query(
    `
    INSERT INTO job_requirements (
      job_req_id,
      user_id,
      job_title,
      location,
      is_remote,
      is_intern,
      is_fresher
    )
    VALUES ($1, $2, $3, $4, $5, $6, $7)

    RETURNING *;
    `,
    [
      jobReqId,
      userId,
      job_title,
      location,
      is_remote,
      is_intern,
      is_fresher,
    ]
  );

  return result.rows[0];
};