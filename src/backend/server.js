import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { addNewJob } from "./Database/new_Job_Registration.js";
// import "./cron/jobScraperCron.js"; // Import and start the CRON job
 // Import function

const app = express();
const PORT = 5000;

app.use(cors()); // Enable CORS
app.use(bodyParser.json()); // Parse JSON requests

// API to handle job form submission
app.post("/api/add-job", async (req, res) => {
    const userId = "0"; // Placeholder user ID
    const jobData = req.body;

    const result = await addNewJob(userId, jobData);
    if (result.success) {
        res.status(201).json({ message: "Job added successfully!", jobId: result.jobId });
    } else {
        res.status(500).json({ message: "Failed to add job", error: result.error });
    }
});

app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));
