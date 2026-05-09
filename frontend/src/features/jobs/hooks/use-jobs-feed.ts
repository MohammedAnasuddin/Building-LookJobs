import { useMemo, useState } from "react"

import { mockJobs } from "../data/mock-jobs"

export function useJobsFeed() {
  const [activePreference, setActivePreference] =
    useState("Full Stack")

  const [searchQuery, setSearchQuery] = useState("")

  const filteredJobs = useMemo(() => {
    return mockJobs.filter((job) => {
      const searchableText = `
        ${job.title}
        ${job.company}
        ${job.source}
      `.toLowerCase()

      return searchableText.includes(
        searchQuery.toLowerCase()
      )
    })
  }, [searchQuery])

  return {
    activePreference,
    setActivePreference,

    searchQuery,
    setSearchQuery,

    filteredJobs,
  }
}