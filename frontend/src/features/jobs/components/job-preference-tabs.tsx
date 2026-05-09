import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

const preferences = [
  "Full Stack",
  "AI Engineer",
  "DevOps",
]

export function JobPreferenceTabs() {
  return (
    <Tabs defaultValue="Full Stack">
      <div className="overflow-x-auto pb-1">
        <TabsList className="inline-flex h-10 w-max gap-2 bg-transparent p-0">
          {preferences.map((preference) => (
            <TabsTrigger
              key={preference}
              value={preference}
              className="
                rounded-md
                border
                border-border
                bg-background
                px-4
                text-sm
                data-[state=active]:bg-secondary
              "
            >
              {preference}
            </TabsTrigger>
          ))}
        </TabsList>
      </div>
    </Tabs>
  )
}