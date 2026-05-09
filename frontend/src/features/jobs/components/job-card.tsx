import { Bookmark } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

import type { Job } from "../types/job";
import { useState } from "react";
import { cn } from "@/lib/utils";

type JobCardProps = {
  job: Job;
};

export function JobCard({ job }: JobCardProps) {
  const [saved, setSaved] = useState(false);
  return (
    <Card className="border-border/70 bg-card px-4 py-4 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        {/* Left */}
        <div className="min-w-0 flex-1">
          <h3 className="truncate text-base font-semibold tracking-tight">
            {job.title}
          </h3>

          <p className="mt-1 text-sm text-muted-foreground">{job.company}</p>

          <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
            <span>{job.source}</span>

            <span>•</span>

            <span>{job.postedAt}</span>

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
            onClick={() => setSaved(!saved)}
            className="
              text-muted-foreground
              transition-colors
              hover:text-foreground
          "
          >
            <Bookmark
              className={cn("h-4 w-4", saved && "fill-current text-primary")}
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
