import { apiClient } from "@/shared/lib/api-client"

import type { User } from "../types/user"

type CurrentUserResponse = {
  success: boolean
  data: User
}

export async function getCurrentUser() {
  return apiClient<CurrentUserResponse>(
    "/user/me",
    {
      auth: true,
    }
  )
}