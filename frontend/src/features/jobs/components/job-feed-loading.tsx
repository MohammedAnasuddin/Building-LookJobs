import { JobCardSkeleton } from "./job-card-skeleton"

export function JobFeedLoading() {
  return (
    <div className="space-y-3">
      {Array.from({ length: 5 }).map((_, index) => (
        <JobCardSkeleton key={index} />
      ))}
    </div>
  )
}