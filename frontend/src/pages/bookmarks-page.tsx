import { Card } from "@/components/ui/card";

import { JobCard } from "@/features/jobs/components/job-card";

import { useBookmarks } from "@/features/bookmarks/hooks/use-bookmarks";

import { groupBookmarksByRequirement } from "@/features/bookmarks/utils/group-bookmarks-by-requirement";

import { groupBookmarksByDate } from "@/features/bookmarks/utils/group-bookmarks-by-date";
import { useToggleBookmark } from "@/features/bookmarks/hooks/use-toggle-bookmark";

export function BookmarksPage() {
  const { data, isLoading } = useBookmarks();
  const { mutate: toggleBookmark } = useToggleBookmark();

  const bookmarks = data?.data ?? [];

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Card className="h-24 animate-pulse" />
        <Card className="h-24 animate-pulse" />
        <Card className="h-24 animate-pulse" />
      </div>
    );
  }

  if (bookmarks.length === 0) {
    return (
      <Card className="p-8 text-center">
        <h2 className="text-lg font-semibold">No saved jobs yet</h2>

        <p className="mt-2 text-sm text-muted-foreground">
          Save jobs from your feed to revisit them later.
        </p>
      </Card>
    );
  }

  const groupedRequirements = groupBookmarksByRequirement(bookmarks);

  return (
    <div className="space-y-10">
      {Object.entries(groupedRequirements).map(
        ([requirementId, requirement]) => {
          const groupedDates = groupBookmarksByDate(requirement.jobs);

          return (
            <section key={requirementId} className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold tracking-tight">
                  {requirement.title}
                </h2>

                <p className="mt-1 text-sm text-muted-foreground">
                  {requirement.jobs.length} saved jobs
                </p>
              </div>

              {Object.entries(groupedDates).map(([dateLabel, jobs]) => (
                <div key={dateLabel} className="space-y-4">
                  <div className="flex items-center gap-3">
                    <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                      {dateLabel}
                    </h3>

                    <div className="h-px flex-1 bg-border" />
                  </div>

                  {jobs.map((bookmark) => (
                    <JobCard
                      key={bookmark.bookmark_id}
                      job={{
                        id: String(bookmark.job_update_id),

                        title: bookmark.job_title,

                        company: bookmark.company ?? "Unknown Company",

                        source: bookmark.job_provider,

                        postedAt: new Date(
                          bookmark.bookmarked_at,
                        ).toLocaleDateString(),

                        dayGroup: "today",

                        applyUrl: bookmark.job_url,

                        isRemote:
                          bookmark.job_location
                            ?.toLowerCase()
                            .includes("remote") ?? false,

                        isFresher: false,
                      }}
                      isBookmarked={true}
                      onToggleBookmark={() =>
                        toggleBookmark({
                          jobId: bookmark.job_update_id,
                          isBookmarked: true,
                        })
                      }
                    />
                  ))}
                </div>
              ))}
            </section>
          );
        },
      )}
    </div>
  );
}
