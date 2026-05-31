import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";

export function ErrorPage() {
  return (
    <div className="flex min-h-screen items-center justify-center px-6">
      <div className="max-w-md text-center">
        <h1 className="text-4xl font-bold">
          Oops.
        </h1>

        <p className="mt-4 text-muted-foreground">
          Something went wrong while loading
          this page.
        </p>

        <Button
          asChild
          className="mt-8"
        >
          <Link to="/">
            Return Home
          </Link>
        </Button>
      </div>
    </div>
  );
}
