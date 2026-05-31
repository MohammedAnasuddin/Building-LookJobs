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
      <div className="min-h-screen bg-background px-6 py-12">
        <div className="mx-auto flex max-w-5xl flex-col items-center pt-12 md:pt-20">
          {/* Hero */}
          <h1 className="max-w-4xl text-center text-4xl font-bold tracking-tight sm:text-6xl">
            Stop scrolling job boards.
            <br />
            Let opportunities come to you.
          </h1>

          <p className="mt-6 max-w-2xl text-center text-lg leading-8 text-muted-foreground">
            Create personalized job requirements and automatically discover
            relevant opportunities from multiple platforms in one organized
            feed.
          </p>

          {/* CTA */}
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
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
              Sign In
            </Button>
          </div>

          {/* Features */}
          <div className="mt-20 grid w-full gap-4 md:grid-cols-3">
            <div className="rounded-3xl border border-border p-6">
              <h3 className="font-semibold">Personalized Feeds</h3>

              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                Define exactly what you're looking for and receive a
                continuously updated feed tailored to your goals.
              </p>
            </div>

            <div className="rounded-3xl border border-border p-6">
              <h3 className="font-semibold">Multi-Platform Discovery</h3>

              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                Aggregate opportunities from multiple sources instead of
                checking each platform manually.
              </p>
            </div>

            <div className="rounded-3xl border border-border p-6">
              <h3 className="font-semibold">Save & Track</h3>

              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                Bookmark promising roles and organize opportunities by
                requirement.
              </p>
            </div>
          </div>

          {/* How It Works */}
          <section className="mt-24 w-full">
            <h2 className="text-center text-3xl font-semibold">How It Works</h2>

            <div className="mt-10 grid gap-4 md:grid-cols-4">
              {[
                "Create Requirement",
                "We Scan Sources",
                "Receive Curated Jobs",
                "Save Opportunities",
              ].map((step, index) => (
                <div
                  key={step}
                  className="rounded-3xl border border-border p-6 text-center"
                >
                  <div className="mb-4 text-2xl font-bold text-muted-foreground">
                    {index + 1}
                  </div>

                  <p className="font-medium">{step}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Benefits */}
          <section className="mt-24 w-full">
            <div className="rounded-3xl border border-border p-8">
              <h2 className="text-center text-2xl font-semibold">
                Why LookJobs?
              </h2>

              <div className="mt-8 grid gap-6 md:grid-cols-3">
                <div>
                  <h3 className="font-medium">No More Endless Searching</h3>

                  <p className="mt-2 text-sm text-muted-foreground">
                    Stop checking multiple platforms every day. Let jobs come to
                    you.
                  </p>
                </div>

                <div>
                  <h3 className="font-medium">Focused Opportunities</h3>

                  <p className="mt-2 text-sm text-muted-foreground">
                    Track only the roles that match your goals and experience.
                  </p>
                </div>

                <div>
                  <h3 className="font-medium">Never Lose Good Leads</h3>

                  <p className="mt-2 text-sm text-muted-foreground">
                    Save interesting opportunities and revisit them later.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Footer */}
          <div className="mt-20 border-t border-border pt-10 text-center">
            <p className="text-sm text-muted-foreground">
              Built for focused job seekers who want signal instead of noise.
            </p>
          </div>
        </div>
      </div>
    );
  }
  // Authenticated app
  return children;
}
