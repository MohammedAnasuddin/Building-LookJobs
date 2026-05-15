import { useQuery } from "@tanstack/react-query";

import { getJobRequirements } from "../api/get-job-requirements";

export function useJobRequirements() {
  return useQuery({
    queryKey: ["job-requirements"],

    queryFn: getJobRequirements,
  });
}
