import { ReactNode, useEffect } from "react";

import { Auth0Provider, useAuth0 } from "@auth0/auth0-react";

import { setAccessTokenGetter } from "@/shared/lib/auth-token";

type AuthProviderProps = {
  children: ReactNode;
};

function AuthInitializer() {
  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    setAccessTokenGetter(getAccessTokenSilently);
  }, [getAccessTokenSilently]);

  return null;
}

export function AuthProvider({ children }: AuthProviderProps) {
  return (
    <Auth0Provider
      domain={import.meta.env.VITE_AUTH0_DOMAIN}
      clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
      authorizationParams={{
        redirect_uri: window.location.origin,

        audience: import.meta.env.VITE_AUTH0_AUDIENCE,
      }}
      cacheLocation="localstorage"
      useRefreshTokens
    >
      <AuthInitializer />

      {children}
    </Auth0Provider>
  );
}
