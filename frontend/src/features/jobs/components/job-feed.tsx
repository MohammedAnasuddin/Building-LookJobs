import { mockJobs } from "../data/mock-jobs"

import { FeedSection } from "./feed-section"
import { JobCard } from "./job-card"

export function JobFeed() {
  const todayJobs = mockJobs.filter(
    (job) => job.dayGroup === "today"
  )

  const yesterdayJobs = mockJobs.filter(
    (job) => job.dayGroup === "yesterday"
  )

  const weekJobs = mockJobs.filter(
    (job) => job.dayGroup === "week"
  )

  return (
    <div className="space-y-8">
      {!!todayJobs.length && (
        <FeedSection title="Today">
          <div className="space-y-3">
            {todayJobs.map((job) => (
              <JobCard
                key={job.id}
                job={job}
              />
            ))}
          </div>
        </FeedSection>
      )}

      {!!yesterdayJobs.length && (
        <FeedSection title="Yesterday">
          <div className="space-y-3">
            {yesterdayJobs.map((job) => (
              <JobCard
                key={job.id}
                job={job}
              />
            ))}
          </div>
        </FeedSection>
      )}

      {!!weekJobs.length && (
        <FeedSection title="Last 7 days">
          <div className="space-y-3">
            {weekJobs.map((job) => (
              <JobCard
                key={job.id}
                job={job}
              />
            ))}
          </div>
        </FeedSection>
      )}
    </div>
  )
}