import { getJobUpdatesForUser } from './Database/get_updates.js'; // Import the new function
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { addNewJob } from "./Database/new_Job_Registration.js";
import addUser from './Database/new_user.js';
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

    const result = await addNewJob(jobData);
    if (result.success) {
        res.status(201).json({ message: "Job added successfully!", jobId: result.jobId });
    } else {
        res.status(500).json({ message: "Failed to add job", error: result.error });
    }
});



app.post("/api/register-user", async (req, res) => {
    const { userId, name, email } = req.body;

    if (!userId || !name || !email) {
        return res.status(400).json({ message: "Missing required fields" });
    }

    try {
        const result = await addUser(userId, name, email);
        if (result.success) {
            res.status(201).json({ message: "User registered successfully!", user: result.user });
        } else {
            res.status(500).json({ message: "Failed to register user", error: result.error });
        }
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});




// Your route to fetch job updates by userId
app.get('/user/:userId/job-updates', async (req, res) => {
    const { userId } = req.params;
    console.log("Inside the job updates route") // Get userId from the URL parameter

    if (!userId) {
        return res.status(400).json({ message: "User ID is required" });
    }

    try {
        // Call the function to fetch job updates for the user based on userId
        const result = await getJobUpdatesForUser(userId);

        if (result.success) {
            if (result.jobUpdates.length > 0) {
                return res.json(result.jobUpdates); // Send job updates if found
            } else {
                return res.status(404).json({ message: "No job updates found" });
            }
        } else {
            return res.status(500).json({ message: result.message || "Internal Server Error", error: result.error });
        }
    } catch (err) {
        console.error("❌ Error in job updates route:", err);
        return res.status(500).json({ message: "Internal Server Error", error: err.message });
    }
});



app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));
