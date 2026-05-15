import { apiClient } from "@/shared/lib/api-client"

type CreateJobRequirementPayload = {
  job_title: string

  location: string

  is_remote: boolean

  is_fresher: boolean

  is_intern: boolean
}

export async function createJobRequirement(
  payload: CreateJobRequirementPayload
) {
  return apiClient(
    "/job-requirements",
    {
      method: "POST",

      auth: true,

      body: JSON.stringify(payload),
    }
  )
}