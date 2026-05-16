import {
  addBookmarkService,
  removeBookmarkService,
  getBookmarksService,
} from "../services/bookmark.service.js";

// =========================
// ADD BOOKMARK
// =========================

export const addBookmarkController = async (req, res) => {
  try {
    const userId = req.user.sub;

    const { jobId } = req.params;

    const bookmark = await addBookmarkService({
      userId,
      jobUpdateId: jobId,
    });

    return res.status(201).json({
      success: true,
      data: bookmark,
    });
  } catch (error) {
    console.error("❌ Add bookmark error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to bookmark job",
    });
  }
};

// =========================
// REMOVE BOOKMARK
// =========================

export const removeBookmarkController = async (req, res) => {
  try {
    const userId = req.user.sub;

    const { jobId } = req.params;

    await removeBookmarkService({
      userId,
      jobUpdateId: jobId,
    });

    return res.status(200).json({
      success: true,
      message: "Bookmark removed",
    });
  } catch (error) {
    console.error("❌ Remove bookmark error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to remove bookmark",
    });
  }
};

// =========================
// GET BOOKMARKS
// =========================

export const getBookmarksController = async (req, res) => {
  try {
    const userId = req.user.sub;

    const bookmarks = await getBookmarksService(userId);

    return res.status(200).json({
      success: true,
      data: bookmarks,
    });
  } catch (error) {
    console.error("❌ Get bookmarks error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch bookmarks",
    });
  }
};
