import express from "express";

import { verifyAuth } from "../middleware/auth.middleware.js";

import {
  addBookmarkController,
  removeBookmarkController,
  getBookmarksController,
} from "../controllers/bookmark.controller.js";

const router = express.Router();

// =========================
// ADD BOOKMARK
// =========================

router.post("/:jobId", verifyAuth, addBookmarkController);

// =========================
// REMOVE BOOKMARK
// =========================

router.delete("/:jobId", verifyAuth, removeBookmarkController);

// =========================
// GET ALL BOOKMARKS
// =========================

router.get("/", verifyAuth, getBookmarksController);

export default router;
