import { ReactNode } from "react";

type FeedSectionProps = {
  title: string;
  children: ReactNode;
};

export function FeedSection({ title, children }: FeedSectionProps) {
  return (
    <section className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          {title}
        </h2>
      </div>

      {children}
    </section>
  );
}
