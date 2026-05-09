import { JobCard } from "./job-card"

import { mockJobs } from "../data/mock-jobs"

export function JobFeed() {
  return (
    <div className="space-y-3">
      {mockJobs.map((job) => (
        <JobCard
          key={job.id}
          job={job}
        />
      ))}
    </div>
  )
}