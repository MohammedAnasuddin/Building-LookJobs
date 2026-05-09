import { ReactNode } from "react"

import { Auth0Provider } from "@auth0/auth0-react"

type AuthProviderProps = {
  children: ReactNode
}

export function AuthProvider({
  children,
}: AuthProviderProps) {

  return (
    <Auth0Provider
      domain={import.meta.env.VITE_AUTH0_DOMAIN}
      clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
      authorizationParams={{
        redirect_uri: window.location.origin,

        audience:
          import.meta.env.VITE_AUTH0_AUDIENCE,
      }}
    >
      {children}
    </Auth0Provider>
  )
}