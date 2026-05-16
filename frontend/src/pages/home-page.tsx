import { EmptyFeedState } from "@/features/jobs/components/empty-feed-state";
import { JobsFeed } from "@/features/jobs/components/job-feed";
import { JobPreferenceTabs } from "@/features/jobs/components/job-preference-tabs";
import { JobSearch } from "@/features/jobs/components/job-search";

import { useJobsFeed } from "@/features/jobs/hooks/use-jobs-feed";

export function HomePage() {
  const {
    activePreference,
    setActivePreference,

    searchQuery,
    setSearchQuery,

    filteredJobs,
  } = useJobsFeed();

  return (
    <div className="space-y-6">
      {filteredJobs.length ? (
        <JobsFeed jobs={filteredJobs} />
      ) : (
        <EmptyFeedState />
      )}
    </div>
  );
}
