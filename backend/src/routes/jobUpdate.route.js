import express from "express";

import { verifyAuth } from "../middleware/auth.middleware.js";

import { getJobUpdatesController } from "../controllers/jobUpdate.controller.js";

const router = express.Router();

// 🔥 FEED API
router.get("/:id", verifyAuth, getJobUpdatesController);

export default router;
