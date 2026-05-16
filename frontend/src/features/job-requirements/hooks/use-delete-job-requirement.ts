import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteJobRequirement } from "../api/delete-job-requirement";

export function useDeleteJobRequirement() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteJobRequirement,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["job-requirements"],
      });

      queryClient.invalidateQueries({
        queryKey: ["job-updates"],
      });
    },
  });
}
