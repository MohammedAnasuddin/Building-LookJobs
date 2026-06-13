import { useEffect, useState } from "react";

import { useAuth0 } from "@auth0/auth0-react";

import { registerUser } from "../api/register-user";

export function useAuthBootstrap() {
  const { isAuthenticated, isLoading, user } = useAuth0();

  const [isBootstrapped, setIsBootstrapped] = useState(false);

  useEffect(() => {
    async function bootstrap() {
      if (!isAuthenticated || isLoading || !user) {
        return;
      }

      try {
        console.log("BOOTSTRAP START");

        await registerUser({
          name: user.name || "",
          email: user.email || "",
        });

        console.log("BOOTSTRAP COMPLETE");

        setIsBootstrapped(true);
      } catch (error) {
        console.error("BOOTSTRAP FAILED", error);
        setIsBootstrapped(true);
      }
    }

    void bootstrap();
  }, [isAuthenticated, isLoading, user]);

  return {
    isBootstrapped,
  };
}
