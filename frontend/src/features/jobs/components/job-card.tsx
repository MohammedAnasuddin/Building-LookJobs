import { Bookmark } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

import { cn } from "@/lib/utils";

import type { Job } from "../types/job";

import { useToggleBookmark } from "@/features/bookmarks/hooks/use-toggle-bookmark";

type JobCardProps = {
  job: Job;

  isBookmarked?: boolean;
  onToggleBookmark?: () => void;
};

export function JobCard({
  job,
  isBookmarked = false,
  onToggleBookmark,
}: JobCardProps) {
  const { mutate, isPending } = useToggleBookmark();

  return (
    <Card
      className="
    border-border/70
    bg-card
    px-4
    py-4
    shadow-sm
    transition-all
    duration-200
  "
    >
      <div className="flex items-start justify-between gap-4">
        {/* Left */}
        <div className="min-w-0 flex-1">
          <h3 className="truncate text-base font-semibold tracking-tight">
            {job.title}
          </h3>

          <p className="mt-1 text-sm text-muted-foreground">{job.company}</p>

          <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
            <span>{job.source}</span>

            {/* <span>•</span> */}

            {/* <span>{job.postedAt}</span> */}

            {job.isRemote && (
              <>
                <span>•</span>
                <span>Remote</span>
              </>
            )}

            {job.isFresher && (
              <>
                <span>•</span>
                <span>Fresher</span>
              </>
            )}
          </div>
        </div>

        {/* Right */}
        <div className="flex flex-col items-end gap-3">
          <button
            onClick={onToggleBookmark}
            className="
    text-muted-foreground
    transition-colors
    hover:text-foreground
  "
          >
            <Bookmark
              className={cn(
                "h-4 w-4 transition-all duration-200",
                isBookmarked && "fill-current text-primary",
              )}
            />
          </button>

          <Button size="sm" asChild>
            <a href={job.applyUrl} target="_blank" rel="noreferrer">
              Apply
            </a>
          </Button>
        </div>
      </div>
    </Card>
  );
}
