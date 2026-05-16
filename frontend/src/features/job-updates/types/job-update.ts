export type JobUpdate = {
  id: string;

  job_title: string;

  company: string;

  job_provider: string;

  job_location: string;

  job_url: string;

  added_on: string;

  
};


export type ScrapeStatus =
  | "pending"
  | "scraping"
  | "completed"
  | "failed"