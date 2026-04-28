import { useMutation } from "@tanstack/react-query";
import { createJob } from "../api/jobs.api";

export const useCreateJob = () => {
  return useMutation({
    mutationFn: createJob,
  });
};