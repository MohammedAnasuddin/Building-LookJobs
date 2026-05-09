import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Sheet } from "./components/ui/sheet"

function App() {
  return (
    <div className="min-h-screen bg-background text-foreground p-6">
      <div className="mx-auto max-w-md">
        
        <Card>
          <CardHeader>
            <CardTitle>LookJobs</CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            <Input placeholder="Search jobs..." />

            <Button className="w-full">
              Apply
            </Button>
          </CardContent>
        </Card>

        
      </div>
    </div>
  )
}

export default App