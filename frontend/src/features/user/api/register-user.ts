import { apiClient } from "@/shared/lib/api-client"

type RegisterUserPayload = {
  name: string
  email: string
}

export async function registerUser(
  payload: RegisterUserPayload
) {
  return apiClient("/user/register", {
    method: "POST",

    auth: true,

    body: JSON.stringify(payload),
  })
}