import { format, isToday, isYesterday } from "date-fns";

import type { JobUpdate } from "../types/job-update";

type GroupedUpdates = {
  label: string;

  jobs: JobUpdate[];
};

export function groupJobUpdates(updates: JobUpdate[]): GroupedUpdates[] {
  const groups = new Map<string, JobUpdate[]>();

  for (const update of updates) {
    const date = new Date(update.added_on);

    let label = "";

    if (isToday(date)) {
      label = "Today";
    } else if (isYesterday(date)) {
      label = "Yesterday";
    } else {
      label = format(date, "MMMM d, yyyy");
    }

    const existing = groups.get(label) || [];

    existing.push(update);

    groups.set(label, existing);
  }

  return Array.from(groups.entries()).map(([label, jobs]) => ({
    label,
    jobs,
  }));
}
