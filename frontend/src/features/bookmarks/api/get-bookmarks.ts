import { apiClient } from "@/shared/lib/api-client";

import type { Bookmark } from "../types/bookmark";

type GetBookmarksResponse = {
  success: boolean;

  data: Bookmark[];
};

export async function getBookmarks() {
  return apiClient<GetBookmarksResponse>("/bookmarks", {
    auth: true,
  });
}
