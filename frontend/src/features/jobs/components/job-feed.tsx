import { useEffect, useMemo, useState } from "react";

import { Bookmark, BookmarkCheck, Search } from "lucide-react";

import { Input } from "@/components/ui/input";

import { Button } from "@/components/ui/button";

import { CreateJobRequirementDialog } from "@/features/job-requirements/components/create-job-requirement-dialog";

import { JobRequirementTabs } from "@/features/job-requirements/components/job-requirement-tabs";

import { useJobRequirements } from "@/features/job-requirements/hooks/use-job-requirements";

import { useJobUpdates } from "@/features/job-updates/hooks/use-job-updates";

import { ACTIVE_REQUIREMENT_STORAGE_KEY } from "@/shared/constants/storage";

import { JobFeedSkeleton } from "@/features/job-updates/components/job-feed-skeleton";

import { JobRequirementTabsSkeleton } from "@/features/job-requirements/components/job-requirement-tabs-skeleton";

import { groupJobUpdates } from "@/features/job-updates/utils/group-job-updates";

import { useBookmarks } from "@/features/bookmarks/hooks/use-bookmarks";

import { useToggleBookmark } from "@/features/bookmarks/hooks/use-toggle-bookmark";

import { Progress } from "@/components/ui/progress";

import { SCRAPE_STAGE_CONFIG } from "@/features/job-updates/constants/scrape-stage-config";

export function JobsFeed() {
  const { data: requirementsData, isLoading: isRequirementsLoading } =
    useJobRequirements();

  const requirements = requirementsData?.data || [];
  console.log("REQUIREMENTS:", requirements);

  const [activeRequirementId, setActiveRequirementId] = useState<string | null>(
    () => {
      return localStorage.getItem(ACTIVE_REQUIREMENT_STORAGE_KEY);
    },
  );

  console.log("ACTIVE REQUIREMENT:", activeRequirementId);

  useEffect(() => {
    if (requirements.length === 0) {
      return;
    }

    // only initialize once
    if (activeRequirementId === null) {
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

  const scrapeStatus = updatesData?.scrape_status;

  const stage = updatesData?.scrape_stage || "pending";

  const progress = updatesData?.progress || 10;

  const stageConfig = SCRAPE_STAGE_CONFIG[
    stage as keyof typeof SCRAPE_STAGE_CONFIG
  ] || {
    label: "Preparing your feed...",
    progress: 10,
  };

  const [search, setSearch] = useState("");

  const filteredUpdates = useMemo(() => {
    return updates.filter((job) => {
      return [job.job_title, job.company, job.job_location, job.job_provider]
        .join(" ")
        .toLowerCase()
        .includes(search.toLowerCase());
    });
  }, [updates, search]);

  const groupedUpdates = groupJobUpdates(filteredUpdates);

  const { data: bookmarksData } = useBookmarks();

  const bookmarks = bookmarksData?.data || [];

  const { mutate: toggleBookmark } = useToggleBookmark();

  const isScraping = scrapeStatus === "pending" || scrapeStatus === "scraping";

  console.log({
    scrapeStatus,
    stage,
    updatesData,
  });

  console.log({
    scrapeStatus,
    groupedUpdates,
    groupedLength: groupedUpdates.length,
    updates,
  });

  if (isRequirementsLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <div className="h-6 w-32 rounded-full bg-muted" />

            <div className="h-4 w-64 rounded-full bg-muted" />
          </div>

          <div className="h-10 w-40 rounded-full bg-muted" />
        </div>

        <JobRequirementTabsSkeleton />

        <JobFeedSkeleton />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Job Feed</h1>

          <p className="mt-1 text-sm text-muted-foreground">
            Personalized opportunities updated continuously.
          </p>
        </div>

        <CreateJobRequirementDialog
          onCreated={(requirementId) => {
            setTimeout(() => {
              setActiveRequirementId(requirementId);
            }, 0);
          }}
        />
      </div>

      {/* Empty Requirements */}
      {requirements.length === 0 ? (
        <div className="rounded-2xl border border-border p-6">
          <h2 className="mb-2 text-lg font-semibold">No tracked jobs yet</h2>

          <p className="text-sm text-muted-foreground">
            Create your first job requirement to start tracking opportunities.
          </p>
        </div>
      ) : (
        <>
          {/* Tabs */}
          <JobRequirementTabs
            requirements={requirements}
            activeRequirementId={activeRequirementId}
            onSelect={setActiveRequirementId}
          />

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

            <Input
              placeholder="Search jobs, companies, locations..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-11 rounded-xl pl-10"
            />
          </div>

          {/* Scraping State */}
          {isScraping && (
            <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
              <div className="mb-5 flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-lg font-semibold tracking-tight">
                    {stageConfig.label}
                  </h2>

                  <p className="mt-2 text-sm text-muted-foreground">
                    Your personalized job feed is being prepared.
                  </p>
                </div>

                <div className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground">
                  {progress}%
                </div>
              </div>

              <div className="overflow-hidden rounded-full bg-muted">
                <div
                  className="h-2 rounded-full bg-foreground transition-all duration-700"
                  style={{
                    width: `${progress}%`,
                  }}
                />
              </div>

              <div className="mt-6 space-y-3">
                <div className="h-4 w-2/3 animate-pulse rounded-full bg-muted" />

                <div className="h-4 w-1/2 animate-pulse rounded-full bg-muted" />

                <div className="h-4 w-1/3 animate-pulse rounded-full bg-muted" />
              </div>
            </div>
          )}

          {/* Feed Loading State */}
          {!isScraping && isUpdatesLoading && !updatesData && (
            <JobFeedSkeleton />
          )}

          {/* Failed State */}
          {scrapeStatus === "failed" && (
            <div className="rounded-2xl border border-border p-6">
              <h2 className="mb-2 text-lg font-semibold">
                Failed to fetch jobs
              </h2>

              <p className="text-sm text-muted-foreground">
                Please try again later.
              </p>
            </div>
          )}

          {/* Empty Feed */}
          {scrapeStatus === "completed" && groupedUpdates.length === 0 && (
            <div className="rounded-2xl border border-border p-6">
              <h2 className="mb-2 text-lg font-semibold">
                No matching jobs found yet
              </h2>

              <p className="text-sm text-muted-foreground">
                Try updating your job requirement or check again later.
              </p>
            </div>
          )}

          {/* Feed */}
          {scrapeStatus === "completed" && groupedUpdates.length > 0 && (
            <div className="space-y-8">
              {groupedUpdates.map((group) => (
                <section key={group.label}>
                  <div className="mb-4 flex items-center gap-3">
                    <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                      {group.label}
                    </h2>

                    <div className="h-px flex-1 bg-border" />
                  </div>

                  <div className="space-y-4">
                    {group.jobs.map((job) => {
                      const isBookmarked = bookmarks.some(
                        (bookmark: any) => bookmark.job_update_id === job.id,
                      );

                      return (
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

                            <div className="flex items-center gap-2">
                              <span className="rounded-full border border-border px-2 py-1 text-xs text-muted-foreground">
                                {job.job_provider}
                              </span>

                              <Button
                                size="icon"
                                variant="ghost"
                                className="h-8 w-8 rounded-full"
                                onClick={() =>
                                  toggleBookmark({
                                    jobId: job.id,
                                    isBookmarked,
                                  })
                                }
                              >
                                {isBookmarked ? (
                                  <BookmarkCheck className="h-4 w-4" />
                                ) : (
                                  <Bookmark className="h-4 w-4" />
                                )}
                              </Button>
                            </div>
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
                      );
                    })}
                  </div>
                </section>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
