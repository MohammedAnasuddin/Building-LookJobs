import type { ReactNode } from "react";

import { useAuth0 } from "@auth0/auth0-react";

import { BriefcaseBusiness } from "lucide-react";

import { Button } from "@/components/ui/button";

type AuthGateProps = {
  children: ReactNode;
};

export function AuthGate({ children }: AuthGateProps) {
  const { isAuthenticated, isLoading, loginWithRedirect, error } = useAuth0();

  // Wait for Auth0 initialization
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-muted border-t-foreground" />
      </div>
    );
  }

  // Optional auth error state
  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center px-6">
        <div className="text-center">
          <h2 className="mb-2 text-lg font-semibold">Authentication Error</h2>

          <p className="text-sm text-muted-foreground">{error.message}</p>
        </div>
      </div>
    );
  }

  // User not authenticated
  if (!isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center px-6">
        <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
          <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-border bg-background">
            <BriefcaseBusiness className="h-7 w-7" />
          </div>

          <h1 className="max-w-xl text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
            Personalized job discovery built for focused career growth.
          </h1>

          <p className="mt-6 max-w-lg text-base leading-7 text-muted-foreground sm:text-lg">
            Track curated opportunities across platforms with continuously
            updated, requirement-driven job feeds.
          </p>

          <div className="mt-10 flex items-center gap-4">
            <Button
              size="lg"
              className="rounded-full px-8"
              onClick={() => loginWithRedirect()}
            >
              Get Started
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="rounded-full px-8"
              onClick={() => loginWithRedirect()}
            >
              Login
            </Button>
          </div>

          <div className="mt-16 flex flex-wrap items-center justify-center gap-3 text-sm text-muted-foreground">
            <span className="rounded-full border border-border px-3 py-1">
              Multi-platform feeds
            </span>

            <span className="rounded-full border border-border px-3 py-1">
              AI relevance filtering
            </span>

            <span className="rounded-full border border-border px-3 py-1">
              Personalized tracking
            </span>
          </div>
        </div>
      </div>
    );
  }

  // Authenticated app
  return children;
}
