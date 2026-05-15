import { useQuery } from "@tanstack/react-query";

import { getJobUpdates } from "../api/get-job-updates";

export function useJobUpdates(jobReqId: string | null) {
  return useQuery({
    queryKey: ["job-updates", jobReqId],

    queryFn: () => getJobUpdates(jobReqId as string),

    enabled: !!jobReqId,
  });
}
