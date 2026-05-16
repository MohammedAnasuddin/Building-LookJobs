import { useQuery } from "@tanstack/react-query";

import { getBookmarks } from "../api/get-bookmarks";

export function useBookmarks() {
  return useQuery({
    queryKey: ["bookmarks"],

    queryFn: getBookmarks,
  });
}
