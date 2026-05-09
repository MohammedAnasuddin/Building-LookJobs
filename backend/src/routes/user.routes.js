import express from "express";
import {
  getUserProfile,
  registerUser,
  getCurrentUser,
} from "../controllers/user.controller.js";

const router = express.Router();

router.get("/profile/:userId", getUserProfile);
router.post("/register-user", registerUser);
router.get("/me", verifyAuth, getCurrentUser);

export default router;