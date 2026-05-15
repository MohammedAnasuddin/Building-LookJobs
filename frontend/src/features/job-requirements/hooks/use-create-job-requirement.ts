import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createJobRequirement } from "../api/create-job-requirement";

export function useCreateJobRequirement() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createJobRequirement,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["job-requirements"],
      });
    },
  });
}
