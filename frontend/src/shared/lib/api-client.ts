const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL

type RequestOptions = RequestInit & {
  auth?: boolean
}

export async function apiClient<T>(
  endpoint: string,
  options: RequestOptions = {}
): Promise<T> {
  const { auth = false, headers, ...rest } = options

  const response = await fetch(
    `${API_BASE_URL}${endpoint}`,
    {
      ...rest,

      headers: {
        "Content-Type": "application/json",

        ...(auth && {
          Authorization: `Bearer ${localStorage.getItem(
            "access_token"
          )}`,
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