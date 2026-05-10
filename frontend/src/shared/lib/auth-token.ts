let accessTokenGetter:
  | (() => Promise<string>)
  | null = null

export function setAccessTokenGetter(
  getter: () => Promise<string>
) {
  accessTokenGetter = getter
}

export async function getAccessToken() {
  if (!accessTokenGetter) {
    throw new Error(
      "Access token getter not initialized"
    )
  }

  return accessTokenGetter()
}