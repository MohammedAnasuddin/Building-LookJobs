import type { Job } from "../types/job";

export const mockJobs: Job[] = [
  {
    id: "1",
    title: "Frontend Engineer",
    company: "Google",
    source: "LinkedIn",
    postedAt: "2h ago",
    isRemote: true,
    isFresher: true,
    applyUrl: "#",
  },
  {
    id: "2",
    title: "AI Engineer",
    company: "Microsoft",
    source: "Indeed",
    postedAt: "5h ago",
    isRemote: true,
    applyUrl: "#",
  },
  {
    id: "3",
    title: "Full Stack Developer",
    company: "Amazon",
    source: "Naukri",
    postedAt: "1d ago",
    isFresher: true,
    applyUrl: "#",
  },
];
