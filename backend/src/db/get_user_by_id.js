import pool from "./db_setup.js";

export const getUserById = async (userId) => {
  const result = await pool.query(
    `
    SELECT
      user_id,
      name,
      email
    FROM users
    WHERE user_id = $1
    `,
    [userId]
  );

  return result.rows[0];
};