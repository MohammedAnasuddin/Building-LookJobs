import express from "express";
import { getJobUpdates, createJob } from "../controllers/jobs.controller.js";
import { verifyAuth } from "../middleware/auth.middleware.js";

const router = express.Router();

// 🔒 Protected route
router.post("/add-job", verifyAuth, createJob);

// (optional for now, protect later)
router.get("/:jobId", getJobUpdates);

export default router;