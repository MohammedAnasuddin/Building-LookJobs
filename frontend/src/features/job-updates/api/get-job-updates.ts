import { apiClient } from "@/shared/lib/api-client";

import type { JobUpdate } from "../types/job-update";

import type { JobUpdatesResponse } from "../types/job-updates-response";

type JobUpdatesResponse = {
  success: boolean;

  data: JobUpdate[];
};

// export async function getJobUpdates(
//   jobReqId: string
// ) {
//   return apiClient<JobUpdatesResponse>(
//     `/job-updates/${jobReqId}`,
//     {
//       auth: true,
//     }
//   )
// }

export async function getJobUpdates(jobReqId: string) {
  console.log("API CALLING:", `/job-updates/${jobReqId}`);

  return apiClient(`/job-updates/${jobReqId}`, {
    auth: true,
  });
}
