import pool from "./db_setup.js";

export const getJobRequirementsByUserId = async (userId) => {
  const result = await pool.query(
    `
    SELECT *
    FROM job_requirements
    WHERE user_id = $1
    ORDER BY added_date DESC
    `,
    [userId],
  );

  return result.rows;
};
