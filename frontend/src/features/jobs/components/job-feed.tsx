import { useEffect, useState } from "react";

import { CreateJobRequirementDialog } from "@/features/job-requirements/components/create-job-requirement-dialog";

import { JobRequirementTabs } from "@/features/job-requirements/components/job-requirement-tabs";

import { useJobRequirements } from "@/features/job-requirements/hooks/use-job-requirements";

import { useJobUpdates } from "@/features/job-updates/hooks/use-job-updates";

import { ACTIVE_REQUIREMENT_STORAGE_KEY } from "@/shared/constants/storage";

export function JobsFeed() {
  const { data: requirementsData, isLoading: isRequirementsLoading } =
    useJobRequirements();

  const requirements = requirementsData?.data || [];

  const [activeRequirementId, setActiveRequirementId] = useState<string | null>(
    () => {
      return localStorage.getItem(ACTIVE_REQUIREMENT_STORAGE_KEY);
    },
  );

  useEffect(() => {
    if (requirements.length === 0) {
      return;
    }

    const requirementExists = requirements.some(
      (requirement) => requirement.job_req_id === activeRequirementId,
    );

    if (!requirementExists) {
      setActiveRequirementId(requirements[0].job_req_id);
    }
  }, [requirements, activeRequirementId]);

  useEffect(() => {
    if (!activeRequirementId) {
      return;
    }

    localStorage.setItem(ACTIVE_REQUIREMENT_STORAGE_KEY, activeRequirementId);
  }, [activeRequirementId]);

  const { data: updatesData, isLoading: isUpdatesLoading } =
    useJobUpdates(activeRequirementId);

  const updates = updatesData?.data || [];

  if (isRequirementsLoading) {
    return (
      <div className="text-sm text-muted-foreground">
        Loading requirements...
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold tracking-tight">Job Feed</h1>

          <p className="mt-1 text-sm text-muted-foreground">
            Personalized opportunities updated continuously.
          </p>
        </div>

        <CreateJobRequirementDialog />
      </div>

      {/* Empty Requirements State */}
      {requirements.length === 0 ? (
        <div className="rounded-2xl border border-border p-6">
          <h2 className="mb-2 text-lg font-semibold">No tracked jobs yet</h2>

          <p className="text-sm text-muted-foreground">
            Create your first job requirement to start tracking opportunities.
          </p>
        </div>
      ) : (
        <>
          {/* Requirement Tabs */}
          <JobRequirementTabs
            requirements={requirements}
            activeRequirementId={activeRequirementId}
            onSelect={setActiveRequirementId}
          />

          {/* Feed Loading */}
          {isUpdatesLoading ? (
            <div className="text-sm text-muted-foreground">Loading jobs...</div>
          ) : updates.length === 0 ? (
            <div className="rounded-2xl border border-border p-6">
              <p className="text-sm text-muted-foreground">
                No jobs found yet for this requirement.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {updates.map((job) => (
                <article
                  key={job.id}
                  className="rounded-2xl border border-border p-5 transition-colors hover:border-muted-foreground/30"
                >
                  <div className="mb-3 flex items-start justify-between gap-4">
                    <div>
                      <h2 className="text-base font-semibold">
                        {job.job_title}
                      </h2>

                      <p className="mt-1 text-sm text-muted-foreground">
                        {job.company}
                      </p>
                    </div>

                    <span className="rounded-full border border-border px-2 py-1 text-xs text-muted-foreground">
                      {job.job_provider}
                    </span>
                  </div>

                  <div className="mb-4 flex items-center gap-2 text-sm text-muted-foreground">
                    <span>{job.job_location}</span>
                  </div>

                  <a
                    href={job.job_url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm font-medium text-foreground underline underline-offset-4"
                  >
                    View Job
                  </a>
                </article>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
