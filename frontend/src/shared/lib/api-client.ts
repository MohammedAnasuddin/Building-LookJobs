type RequestOptions = RequestInit & {
  token?: string
}

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL

export async function apiClient<T>(
  endpoint: string,
  options: RequestOptions = {}
): Promise<T> {
  const { token, headers, ...rest } =
    options

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