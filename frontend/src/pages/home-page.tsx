import { EmptyFeedState } from "@/features/jobs/components/empty-feed-state"
import { JobsFeed } from "@/features/jobs/components/job-feed"
import { JobPreferenceTabs } from "@/features/jobs/components/job-preference-tabs"
import { JobSearch } from "@/features/jobs/components/job-search"

import { useJobsFeed } from "@/features/jobs/hooks/use-jobs-feed"

export function HomePage() {
  const {
    activePreference,
    setActivePreference,

    searchQuery,
    setSearchQuery,

    filteredJobs,
  } = useJobsFeed()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">
          Today’s Jobs
        </h1>

        <p className="mt-1 text-sm text-muted-foreground">
          Fresh opportunities from your tracked preferences.
        </p>
      </div>

      <JobPreferenceTabs
        value={activePreference}
        onChange={setActivePreference}
      />

      <JobSearch
        value={searchQuery}
        onChange={setSearchQuery}
      />

      {filteredJobs.length ? (
        <JobsFeed jobs={filteredJobs} />
      ) : (
        <EmptyFeedState />
      )}
    </div>
  )
}