import { Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { useDeleteJobRequirement } from "../hooks/use-delete-job-requirement";

import type { JobRequirement } from "../types/job-requirement";

type JobRequirementTabsProps = {
  requirements: JobRequirement[];

  activeRequirementId: string | null;

  onSelect: (id: string) => void;
};

export function JobRequirementTabs({
  requirements,
  activeRequirementId,
  onSelect,
}: JobRequirementTabsProps) {
  const { mutate, isPending } = useDeleteJobRequirement();

  return (
    <div className="mb-6 flex gap-2 overflow-x-auto pb-2">
      {requirements.map((requirement) => {
        console.log({
          activeRequirementId,
          requirementId: requirement.job_req_id,
        });

        const isActive = activeRequirementId === requirement.job_req_id;

        return (
          <div
            key={requirement.job_req_id}
            className={[
              "group flex items-center gap-2 rounded-full border px-3 py-2 transition-colors",

              isActive
                ? "border-foreground bg-foreground text-background"
                : "border-border bg-background text-muted-foreground hover:text-foreground",
            ].join(" ")}
          >
            <button
              onClick={() => onSelect(requirement.job_req_id)}
              className="text-sm whitespace-nowrap"
            >
              {requirement.job_title}
            </button>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  size="icon"
                  variant="ghost"
                  className={[
                    "h-5 w-5 rounded-full p-0 opacity-0 transition-opacity group-hover:opacity-100",

                    isActive
                      ? "text-background hover:bg-background/10 hover:text-background"
                      : "hover:bg-destructive/10 hover:text-destructive",
                  ].join(" ")}
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              </AlertDialogTrigger>

              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete requirement?</AlertDialogTitle>

                  <AlertDialogDescription>
                    This will permanently remove this tracked job feed and all
                    associated updates.
                  </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>

                  <AlertDialogAction
                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    onClick={() => mutate(requirement.job_req_id)}
                    disabled={isPending}
                  >
                    {isPending ? "Deleting..." : "Delete"}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        );
      })}
    </div>
  );
}
