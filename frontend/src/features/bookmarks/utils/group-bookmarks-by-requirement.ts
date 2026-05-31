import type { Bookmark } from "../types/bookmark";

export function groupBookmarksByRequirement(bookmarks: Bookmark[]) {
  return bookmarks.reduce(
    (acc, bookmark) => {
      if (!acc[bookmark.job_req_id]) {
        acc[bookmark.job_req_id] = {
          title: bookmark.requirement_title,

          jobs: [],
        };
      }

      acc[bookmark.job_req_id].jobs.push(bookmark);

      return acc;
    },

    {} as Record<
      string,
      {
        title: string;
        jobs: Bookmark[];
      }
    >,
  );
}
