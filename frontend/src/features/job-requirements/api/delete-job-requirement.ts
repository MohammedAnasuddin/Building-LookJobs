import { apiClient } from "@/shared/lib/api-client"

export async function deleteJobRequirement(
  requirementId: string
) {
  return apiClient(
    `/job-requirements/${requirementId}`,
    {
      method: "DELETE",

      auth: true,
    }
  )
}