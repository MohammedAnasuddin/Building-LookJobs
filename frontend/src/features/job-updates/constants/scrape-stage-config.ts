export const SCRAPE_STAGE_CONFIG = {
  pending: {
    progress: 10,
    label: "Preparing your search...",
  },

  scraping_jobs: {
    progress: 40,
    label: "Scraping jobs across platforms...",
  },

  ai_filtering: {
    progress: 70,
    label: "Filtering jobs with AI...",
  },

  saving_jobs: {
    progress: 90,
    label: "Saving your jobs...",
  },

  completed: {
    progress: 100,
    label: "Done",
  },

  failed: {
    progress: 100,
    label: "Failed",
  },
} as const;
