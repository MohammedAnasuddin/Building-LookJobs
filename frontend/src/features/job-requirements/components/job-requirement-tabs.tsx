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
  return (
    <div className="mb-6 flex gap-2 overflow-x-auto pb-2">
      {requirements.map((requirement) => {
        const isActive = activeRequirementId === requirement.job_req_id;

        return (
          <button
            key={requirement.job_req_id}
            onClick={() => onSelect(requirement.job_req_id)}
            className={[
              "rounded-full border px-4 py-2 text-sm transition-colors whitespace-nowrap",

              isActive
                ? "border-foreground bg-foreground text-background"
                : "border-border bg-background text-muted-foreground hover:text-foreground",
            ].join(" ")}
          >
            {requirement.job_title}
          </button>
        );
      })}
    </div>
  );
}
