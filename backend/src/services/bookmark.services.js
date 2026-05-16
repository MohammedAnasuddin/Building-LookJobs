import {
  addBookmark,
  removeBookmark,
  getBookmarks,
} from "../db/bookmark.db.js";

// =========================
// ADD
// =========================

export const addBookmarkService = async ({ userId, jobUpdateId }) => {
  return await addBookmark({
    userId,
    jobUpdateId,
  });
};

// =========================
// REMOVE
// =========================

export const removeBookmarkService = async ({ userId, jobUpdateId }) => {
  return await removeBookmark({
    userId,
    jobUpdateId,
  });
};

// =========================
// GET
// =========================

export const getBookmarksService = async (userId) => {
  return await getBookmarks(userId);
};
