import { apiClient } from "@/shared/lib/api-client"

export async function getBookmarks() {
  return apiClient<any>(
    "/bookmarks",
    {
      auth: true,
    }
  )
}