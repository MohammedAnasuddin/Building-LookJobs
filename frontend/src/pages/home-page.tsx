import { FeedSection } from "@/features/jobs/components/feed-section";
import { JobFeed } from "@/features/jobs/components/job-feed";
import { JobFeedLoading } from "@/features/jobs/components/job-feed-loading";
import { JobPreferenceTabs } from "@/features/jobs/components/job-preference-tabs";
import { JobSearch } from "@/features/jobs/components/job-search";
import { EmptyFeedState } from './../features/jobs/components/empty-feed-state';

export function HomePage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Today’s Jobs</h1>

        <p className="mt-1 text-sm text-muted-foreground">
          Fresh opportunities from your tracked preferences.
        </p>
      </div>

      {/* Preference Tabs */}
      <JobPreferenceTabs />

      {/* Search */}
      <JobSearch />

      {/* Feed */}
      <JobFeed />
      {/* <JobFeedLoading/> */}
      {/* <EmptyFeedState /> */}

    </div>
  );
}
