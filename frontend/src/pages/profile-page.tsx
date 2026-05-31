import { useAuth0 } from "@auth0/auth0-react";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { useBookmarks } from "@/features/bookmarks/hooks/use-bookmarks";
import { useJobRequirements } from "@/features/job-requirements/hooks/use-job-requirements";

export function ProfilePage() {
  const { user, logout } = useAuth0();

  const { data: bookmarksData } = useBookmarks();

  const { data: requirementsData } = useJobRequirements();

  const bookmarks = bookmarksData?.data ?? [];

  const requirements = requirementsData ?? [];

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h1 className="text-xl font-semibold">Profile</h1>

        <div className="mt-6 space-y-4">
          <div>
            <p className="text-sm text-muted-foreground">Name</p>

            <p className="font-medium">{user?.name}</p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">Email</p>

            <p className="font-medium">{user?.email}</p>
          </div>
        </div>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="p-6">
          <p className="text-sm text-muted-foreground">Requirements Tracked</p>

          <p className="mt-2 text-3xl font-bold">{requirements.length}</p>
        </Card>

        <Card className="p-6">
          <p className="text-sm text-muted-foreground">Saved Jobs</p>

          <p className="mt-2 text-3xl font-bold">{bookmarks.length}</p>
        </Card>
      </div>

      <Button
        variant="destructive"
        onClick={() =>
          logout({
            logoutParams: {
              returnTo: window.location.origin,
            },
          })
        }
      >
        Logout
      </Button>
    </div>
  );
}
