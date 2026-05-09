export function EmptyFeedState() {
  return (
    <div className="rounded-xl border border-dashed border-border p-10 text-center">
      <h3 className="text-base font-semibold tracking-tight">
        You're all caught up
      </h3>

      <p className="mt-2 text-sm text-muted-foreground">
        New jobs will appear here during the next update cycle.
      </p>
    </div>
  )
}