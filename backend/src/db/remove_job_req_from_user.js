import pool from "./db_setup.js";

export const removeJobReqFromUser = async ({
  userId,
  jobReqId,
}) => {
  await pool.query(
    `
    UPDATE users

    SET job_req_id_array =
      ARRAY_REMOVE(job_req_id_array, $1)

    WHERE user_id = $2
    `,
    [jobReqId, userId]
  );
};