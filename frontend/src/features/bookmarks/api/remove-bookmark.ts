import { apiClient } from "@/shared/lib/api-client";

export async function removeBookmark(jobId: number) {
  return apiClient(`/bookmarks/${jobId}`, {
    method: "DELETE",

    auth: true,
  });
}
