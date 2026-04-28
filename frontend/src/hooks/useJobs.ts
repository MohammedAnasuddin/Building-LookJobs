import { useQuery } from "@tanstack/react-query";
import { getJobUpdates } from "../api/jobs.api";

export const useJobs = (jobId: string | null) => {
  return useQuery({
    queryKey: ["jobs", jobId],
    queryFn: () => getJobUpdates(jobId as string),
    enabled: !!jobId,

    refetchInterval: (data) => {
      if (!data?.jobs_by_date || Object.keys(data.jobs_by_date).length === 0) {
        return 4000; // keep polling
      }
      return false; // stop when data arrives
    },
  });
};