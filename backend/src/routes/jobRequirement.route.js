import express from "express";

import { verifyAuth }
from "../middleware/auth.middleware.js";

import {
  getUserJobRequirements,
  createJobRequirementController,
  deleteJobRequirementController,
} from "../controllers/jobRequirement.controller.js";

const router = express.Router();

router.get(
  "/",
  verifyAuth,
  getUserJobRequirements
);

router.post(
  "/",
  verifyAuth,
  createJobRequirementController
);

router.delete(
  "/:id",
  verifyAuth,
  deleteJobRequirementController
);

export default router;