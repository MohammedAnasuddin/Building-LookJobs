import { Card } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function JobCardSkeleton() {
  return (
    <Card className="border-border/70 p-4 shadow-sm">
      <div className="space-y-4">
        <div className="space-y-2">
          <Skeleton className="h-5 w-2/3" />
          <Skeleton className="h-4 w-1/3" />
        </div>

        <div className="flex gap-2">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-20" />
        </div>

        <div className="flex items-center justify-between">
          <Skeleton className="h-4 w-28" />

          <Skeleton className="h-8 w-20" />
        </div>
      </div>
    </Card>
  )
}