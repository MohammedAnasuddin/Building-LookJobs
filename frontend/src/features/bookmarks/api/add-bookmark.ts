import { apiClient } from "@/shared/lib/api-client";

export async function addBookmark(jobId: number) {
  return apiClient(`/bookmarks/${jobId}`, {
    method: "POST",

    auth: true,
  });
}
