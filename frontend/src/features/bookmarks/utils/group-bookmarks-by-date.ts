import { isToday, isYesterday } from "date-fns";

import type { Bookmark } from "../types/bookmark";

export function groupBookmarksByDate(bookmarks: Bookmark[]) {
  return bookmarks.reduce(
    (acc, bookmark) => {
      const date = new Date(bookmark.bookmarked_at);

      let key = "Older";

      if (isToday(date)) {
        key = "Today";
      } else if (isYesterday(date)) {
        key = "Yesterday";
      }

      if (!acc[key]) {
        acc[key] = [];
      }

      acc[key].push(bookmark);

      return acc;
    },

    {} as Record<string, Bookmark[]>,
  );
}
