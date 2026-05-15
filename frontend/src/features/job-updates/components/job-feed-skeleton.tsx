import { Skeleton } from "@/components/ui/skeleton";

export function JobFeedSkeleton() {
  return (
    <div className="space-y-4">
      {Array.from({ length: 5 }).map((_, index) => (
        <div key={index} className="rounded-2xl border border-border p-5">
          <div className="mb-4 flex items-start justify-between gap-4">
            <div className="space-y-2">
              <Skeleton className="h-5 w-48 rounded-full" />

              <Skeleton className="h-4 w-32 rounded-full" />
            </div>

            <Skeleton className="h-6 w-20 rounded-full" />
          </div>

          <Skeleton className="mb-4 h-4 w-24 rounded-full" />

          <Skeleton className="h-4 w-28 rounded-full" />
        </div>
      ))}
    </div>
  );
}
