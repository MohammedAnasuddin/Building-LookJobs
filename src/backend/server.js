import { getJobUpdatesForJob } from "./Database/get_updates.js"; // Import the new function
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { addNewJob } from "./Database/new_Job_Registration.js";
import addUser from "./Database/new_user.js";
import pool from "./Database/db_setup.js";
import { runScrapeCycle } from "./cron/jobScraperCron.js";

const app = express();
const PORT = 5000;

app.use(cors()); // Enable CORS
app.use(bodyParser.json()); // Parse JSON requests

app.post("/api/demo/run-scraper", async (req, res) => {
  try {
    // await runScrapeCycle("MANUAL DEMO");
    res.json({ message: "Scraper run completed" });
  } catch (err) {
    res.status(500).json({ message: "Scraper failed" });
  }
});

app.get("/api/user/profile/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const result = await pool.query(
      `
      SELECT jid_array
      FROM users
      WHERE user_id = $1
      `,
      [userId]
    );

    if (result.rows.length === 0) {
      return res.json({ job_id: null });
    }

    const jidArray = result.rows[0].jid_array || [];

    // latest job_id (last element)
    const latestJobId =
      jidArray.length > 0 ? jidArray[jidArray.length - 1] : null;

    return res.json({ job_id: latestJobId });
  } catch (err) {
    console.error("❌ Profile fetch error:", err);
    res.status(500).json({ message: "Profile fetch failed" });
  }
});

// API to handle job form submission
app.post("/api/add-job", async (req, res) => {
  const { userId, ...jobData } = req.body;

  const result = await addNewJob(jobData, userId);

  if (result.success) {
    return res.status(201).json({
      message: "Job added successfully!",
      jobId: result.jobId,
    });
  }

  return res.status(500).json({ message: result.error });
});

app.post("/api/register-user", async (req, res) => {
  const { userId, name, email } = req.body;

  if (!userId || !name || !email) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const result = await addUser(userId, name, email);
    if (result.success) {
      res
        .status(201)
        .json({ message: "User registered successfully!", user: result.user });
    } else {
      res
        .status(500)
        .json({ message: "Failed to register user", error: result.error });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Route to fetch job updates by jobId
app.get("/api/jobs/:jobId", async (req, res) => {
  const { jobId } = req.params;

  if (!jobId) {
    return res.status(400).json({ message: "Job ID is required" });
  }

  try {
    const result = await getJobUpdatesForJob(jobId);
    return res.json(result);
  } catch (err) {
    return res.status(500).json({ message: "Failed to fetch jobs" });
  }
});

app.get("/api/jobs/:jobId", async (req, res) => {
  const { jobId } = req.params;

  try {
    const result = await getJobUpdatesForUser(jobId);
    return res.json(result);
  } catch (err) {
    res.status(500).json({ message: "Error fetching jobs" });
  }
});

app.listen(PORT, () =>
  console.log(`✅ Server running on http://localhost:${PORT}`)
);
