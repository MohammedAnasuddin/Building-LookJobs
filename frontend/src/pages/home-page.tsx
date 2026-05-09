import { JobFeed } from "@/features/jobs/components/job-feed";

export function HomePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Today’s Jobs</h1>

        <p className="mt-1 text-sm text-muted-foreground">
          Fresh opportunities from your tracked preferences.
        </p>
      </div>

      <JobFeed />
    </div>
  );
}
