import { useQuery } from "@tanstack/react-query";

import { getJobUpdates } from "../api/get-job-updates";

export function useJobUpdates(jobReqId: string | null) {
  console.log("HOOK RECEIVED jobReqId:", jobReqId);

  return useQuery({
    queryKey: ["job-updates", jobReqId],

    enabled: !!jobReqId,

    queryFn: async () => {
      console.log("FETCHING JOB UPDATES FOR:", jobReqId);

      const result = await getJobUpdates(jobReqId as string);

      console.log("JOB UPDATES RESPONSE:", result);

      return result;
    },

    refetchInterval: (query) => {
      const data = query.state.data;

      console.log("POLL DATA:", data);

      // backend contract missing
      // keep polling until jobs arrive
      if (!data?.scrape_status) {
        return 3000;
      }

      const status = data.scrape_status;

      if (status === "pending" || status === "scraping") {
        return 3000;
      }

      return false;
    },
  });
}
