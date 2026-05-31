import { isToday, isYesterday } from "date-fns";

import type { Bookmark } from "../types/bookmark";

export function groupBookmarksByDate(bookmarks: Bookmark[]) {
  return bookmarks.reduce(
    (acc, bookmark) => {
      const date = new Date(bookmark.bookmarked_at);

      let label = "Older";

      if (isToday(date)) {
        label = "Today";
      } else if (isYesterday(date)) {
        label = "Yesterday";
      }

      if (!acc[label]) {
        acc[label] = [];
      }

      acc[label].push(bookmark);

      return acc;
    },

    {} as Record<string, Bookmark[]>,
  );
}
