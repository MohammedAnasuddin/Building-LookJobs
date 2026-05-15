import { apiClient } from "@/shared/lib/api-client"

import type { JobRequirement } from "../types/job-requirement"

type JobRequirementsResponse = {
  success: boolean

  data: JobRequirement[]
}

export async function getJobRequirements() {
  return apiClient<JobRequirementsResponse>(
    "/job-requirements",
    {
      auth: true,
    }
  )
}