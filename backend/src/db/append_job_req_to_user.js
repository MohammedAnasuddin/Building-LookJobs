import pool from "./db_setup.js";

export const appendJobReqToUser = async ({
  userId,
  jobReqId,
}) => {
  await pool.query(
    `
    UPDATE users

    SET job_req_id_array =
      ARRAY_APPEND(job_req_id_array, $1)

    WHERE user_id = $2
    `,
    [jobReqId, userId]
  );
};