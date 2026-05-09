import pool from "./db_setup.js";

export default async function addUser(userId, name, email) {
  const client = await pool.connect();

  try {
    console.log("Registering user in DB");

    const insertQuery = `
      INSERT INTO users (
        user_id,
        name,
        email,
        job_req_id_array
      )
      VALUES ($1, $2, $3, $4)

      ON CONFLICT (user_id)
      DO UPDATE SET
        name = EXCLUDED.name,
        email = EXCLUDED.email

      RETURNING *;
    `;

    const values = [userId, name, email, []];

    const result = await client.query(insertQuery, values);

    return {
      success: true,
      user: result.rows[0],
    };
  } catch (error) {
    console.error("❌ Error inserting user:", error);

    return {
      success: false,
      error,
    };
  } finally {
    client.release();
  }
}