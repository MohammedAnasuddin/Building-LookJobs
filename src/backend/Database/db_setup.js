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

const check = await pool.query(`
  SELECT table_schema, table_name
  FROM information_schema.tables
  WHERE table_name = 'job_scrape_results'
`);
console.log("✅ Node sees tables:", check.rows);

pool
  .connect()
  .then(() => console.log("✅ PostgreSQL Connected Successfully"))
  .catch((err) => console.error("❌ Database Connection Failed:", err.stack));

export default pool;
