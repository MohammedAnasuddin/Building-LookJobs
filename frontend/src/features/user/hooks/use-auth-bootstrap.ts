import { useEffect } from "react";

import { useAuth0 } from "@auth0/auth0-react";

import { registerUser } from "../api/register-user";
import { useState } from "react";

export function useAuthBootstrap() {
  const { isAuthenticated, isLoading, user } = useAuth0();

  const [isBootstrapped, setIsBootstrapped] = useState(false);

  useEffect(() => {
    async function bootstrap() {
      if (!isAuthenticated || isLoading || !user) {
        return;
      }

      console.log("BOOTSTRAP START")




      try {
        await registerUser({
          name: user.name || "",
          email: user.email || "",
        });

        console.log("BOOTSTRAP COMPLETE")

        setIsBootstrapped(true);
      } catch (error) {
        console.error(error);
      }
    }

    void bootstrap();
  }, [isAuthenticated, isLoading, user]);

  return {
    isBootstrapped,
  };
}
