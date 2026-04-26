import addUser from "../db/new_user.js";
import pool from "../db/db_setup.js";

export const getUserProfileService = async (userId) => {
  const result = await pool.query(
    `
    SELECT jid_array
    FROM users
    WHERE user_id = $1
    `,
    [userId]
  );

  if (result.rows.length === 0) {
    return { job_id: null };
  }

  const jidArray = result.rows[0].jid_array || [];

  const latestJobId =
    jidArray.length > 0 ? jidArray[jidArray.length - 1] : null;

  return { job_id: latestJobId };
};

export const registerUserService = async (userId, name, email) => {
  return await addUser(userId, name, email);
};