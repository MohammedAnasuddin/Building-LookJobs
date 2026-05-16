import { useEffect } from "react";

import { useAuth0 } from "@auth0/auth0-react";

import { registerUser } from "../api/register-user";

export function useAuthBootstrap() {
  const { isAuthenticated, isLoading, user } = useAuth0();

  useEffect(() => {
    if (!isAuthenticated || isLoading || !user) {
      return;
    }

    void registerUser({
      name: user.name || "",
      email: user.email || "",
    }).catch(console.error);
  }, [isAuthenticated, isLoading, user]);
}
