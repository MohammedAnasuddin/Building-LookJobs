import pkg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pkg;

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT,
});

// =========================
// STARTUP DB VALIDATION
// =========================

try {
  await pool.query("SELECT 1");

  console.log("✅ PostgreSQL connected successfully");
} catch (err) {
  console.error("❌ PostgreSQL connection failed");

  console.error(err);

  process.exit(1);
}

export default pool;
