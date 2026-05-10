import { getAccessToken } from "./auth-token"

type RequestOptions = RequestInit & {
  auth?: boolean
}

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL

export async function apiClient<T>(
  endpoint: string,
  options: RequestOptions = {}
): Promise<T> {
  const {
    auth = false,
    headers,
    ...rest
  } = options

  let token: string | null = null

  if (auth) {
    token = await getAccessToken()
  }

  const response = await fetch(
    `${API_BASE_URL}${endpoint}`,
    {
      ...rest,

      headers: {
        "Content-Type": "application/json",

        ...(token && {
          Authorization: `Bearer ${token}`,
        }),

        ...headers,
      },
    }
  )

  if (!response.ok) {
    throw new Error(
      `Request failed: ${response.status}`
    )
  }

  return response.json()
}