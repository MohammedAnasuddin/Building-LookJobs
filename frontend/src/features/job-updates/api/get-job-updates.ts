import { apiClient } from "@/shared/lib/api-client"

import type { JobUpdate } from "../types/job-update"

type JobUpdatesResponse = {
  success: boolean

  data: JobUpdate[]
}

export async function getJobUpdates(
  jobReqId: string
) {
  return apiClient<JobUpdatesResponse>(
    `/job-updates/${jobReqId}`,
    {
      auth: true,
    }
  )
}