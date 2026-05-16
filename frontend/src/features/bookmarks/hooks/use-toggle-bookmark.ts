import { useMutation, useQueryClient } from "@tanstack/react-query";

import { addBookmark } from "../api/add-bookmark";

import { removeBookmark } from "../api/remove-bookmark";

type ToggleBookmarkInput = {
  jobId: number;

  isBookmarked: boolean;
};

export function useToggleBookmark() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ jobId, isBookmarked }: ToggleBookmarkInput) => {
      if (isBookmarked) {
        return removeBookmark(jobId);
      }

      return addBookmark(jobId);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["bookmarks"],
      });
    },
  });
}
