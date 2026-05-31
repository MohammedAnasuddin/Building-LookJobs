import { Search } from "lucide-react";

import { Input } from "@/components/ui/input";

type JobFeedFiltersProps = {
  search: string;

  onSearchChange: (value: string) => void;

  selectedProvider: string | null;

  onProviderChange: (provider: string | null) => void;
};

const providers = ["LinkedIn", "Indeed", "Naukri", "Internshala"];

export function JobFeedFilters({
  search,
  onSearchChange,
  selectedProvider,
  onProviderChange,
}: JobFeedFiltersProps) {
  return (
    <div className="mb-6 space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

        <Input
          placeholder="Search jobs, companies, locations..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="h-11 rounded-xl pl-10"
        />
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => onProviderChange(null)}
          className={[
            "rounded-full border px-3 py-1.5 text-sm transition-colors",

            selectedProvider === null
              ? "border-foreground bg-foreground text-background"
              : "border-border text-muted-foreground hover:text-foreground",
          ].join(" ")}
        >
          All
        </button>

        {providers.map((provider) => (
          <button
            key={provider}
            onClick={() => onProviderChange(provider)}
            className={[
              "rounded-full border px-3 py-1.5 text-sm transition-colors",

              selectedProvider === provider
                ? "border-foreground bg-foreground text-background"
                : "border-border text-muted-foreground hover:text-foreground",
            ].join(" ")}
          >
            {provider}
          </button>
        ))}
      </div>
    </div>
  );
}
