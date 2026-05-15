import { Skeleton } from "@/components/ui/skeleton";

export function JobRequirementTabsSkeleton() {
  return (
    <div className="mb-6 flex gap-2 overflow-hidden">
      {Array.from({ length: 4 }).map((_, index) => (
        <Skeleton key={index} className="h-10 w-32 rounded-full" />
      ))}
    </div>
  );
}
