import type { JobUpdate, ScrapeStatus } from "./job-update";

export type JobUpdatesResponse = {
  success: boolean;

  scrape_status: ScrapeStatus;

  scrape_stage: string;

  progress: number;

  data: JobUpdate[];
};
