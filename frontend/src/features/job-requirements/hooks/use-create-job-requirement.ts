import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toast } from "sonner";

import { createJobRequirement } from "../api/create-job-requirement";

export function useCreateJobRequirement() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createJobRequirement,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["job-requirements"],
      });

      toast.success("Requirement created successfully");
    },

    onError: (error: Error) => {
      if (
        error.message.includes("Maximum") ||
        error.message.includes("job requirements allowed")
      ) {
        toast.error(
          "Requirement limit reached. Delete an existing requirement before creating a new one.",
        );

        return;
      }

      toast.error("Failed to create requirement");
    },
  });
}
