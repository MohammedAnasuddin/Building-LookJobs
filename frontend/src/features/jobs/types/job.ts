export interface Job {
  id: string;
  title: string;
  company: string;
  source: string;
  postedAt: string;

  isRemote?: boolean;
  isFresher?: boolean;

  applyUrl: string;

  dayGroup: "today" | "yesterday" | "week"
}
