import type { Bookmark } from "../types/bookmark";

export function groupBookmarksByRequirement(bookmarks: Bookmark[]) {
  return bookmarks.reduce(
    (acc, bookmark) => {
      const key = bookmark.job_req_id;

      if (!acc[key]) {
        acc[key] = {
          title: bookmark.requirement_title,

          jobs: [],
        };
      }

      acc[key].jobs.push(bookmark);

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
