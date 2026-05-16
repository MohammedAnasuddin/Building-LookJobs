import { useAuth0 } from "@auth0/auth0-react";

import { useQuery } from "@tanstack/react-query";

import { getJobRequirements } from "../api/get-job-requirements";

export function useJobRequirements() {
  const { isAuthenticated, isLoading } = useAuth0();

  return useQuery({
    queryKey: ["job-requirements"],

    queryFn: getJobRequirements,

    enabled: isAuthenticated && !isLoading,
  });
}
