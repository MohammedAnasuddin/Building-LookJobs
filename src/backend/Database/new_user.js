import pool from './db_setup.js';




export default async function addUser(userId, name, email) {
  const client = await pool.connect();
  try {
    
    const checkQuery = `SELECT * FROM users WHERE user_id = $1`;
    const checkResult = await client.query(checkQuery, [userId]);

    if (checkResult.rows.length > 0) {
      return { success: true, message: "User already exists", user: checkResult.rows[0] };
    }
    console.log("Received user details writing in to db")

    
    const insertQuery = `
      INSERT INTO "users" (user_id, name, email, jid_array)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `;
    const values = [userId, name, email, []]; 

    const result = await client.query(insertQuery, values);
    return { success: true, user: result.rows[0] };
  } catch (error) {
    console.error("Error inserting user:", error);
    return { success: false, error };
  } finally {
    client.release();
  }
}
