let accessTokenGetter: (() => Promise<string>) | null = null;

export function setAccessTokenGetter(getter: () => Promise<string>) {
  accessTokenGetter = getter;
}

export async function getAccessToken() {
  if (!accessTokenGetter) {
    return null;
  }

  try {
    return await accessTokenGetter();
  } catch (error) {
    console.error("Failed to get access token", error);

    return null;
  }
}
