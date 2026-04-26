import express from "express";
import {
  getUserProfile,
  registerUser,
} from "../controllers/user.controller.js";

const router = express.Router();

router.get("/profile/:userId", getUserProfile);
router.post("/register-user", registerUser);

export default router;