import { useAuth0 } from "@auth0/auth0-react";
import { NavLink, Outlet } from "react-router-dom";
import { useAuthBootstrap } from "@/features/user/hooks/use-auth-bootstrap";
import { AuthGate } from "@/features/auth/components/auth-gate";

export function AppLayout() {
  const { loginWithRedirect, logout, isAuthenticated, getAccessTokenSilently } =
    useAuth0();

  const { isBootstrapped } = useAuthBootstrap();

  if (isAuthenticated && !isBootstrapped) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-muted border-t-foreground" />
      </div>
    );
  }

  return (
    <AuthGate>
      <div className="min-h-screen bg-background text-foreground">
        {/* Top Navigation */}
        <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur">
          <div className="mx-auto flex h-14 max-w-[820px] items-center justify-between px-4">
            <NavLink to="/" className="text-sm font-semibold tracking-tight">
              LookJobs
            </NavLink>

            {isAuthenticated && (
              <div className="hidden items-center gap-8 md:flex">
                <NavItem to="/">Feed</NavItem>

                <NavItem to="/bookmarks">Saved</NavItem>

                <NavItem to="/profile">Profile</NavItem>
              </div>
            )}
          </div>
        </header>

        {/* Main Feed */}
        <main className="mx-auto min-h-screen max-w-[820px] px-4 py-6 pb-24">
          <Outlet />
        </main>

        {/* Bottom Navigation */}
        <nav className="fixed bottom-0 left-0 right-0 border-t border-border bg-background/95 backdrop-blur md:hidden">
          <div className="mx-auto flex h-16 max-w-md items-center justify-around">
            <NavItem to="/">Feed</NavItem>
            <NavItem to="/bookmarks">Saved</NavItem>
            <NavItem to="/profile">Profile</NavItem>
          </div>
        </nav>
      </div>
    </AuthGate>
  );
}

type NavItemProps = {
  to: string;
  children: React.ReactNode;
};

function NavItem({ to, children }: NavItemProps) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        [
          "text-sm font-medium transition-colors",
          isActive ? "text-foreground" : "text-muted-foreground",
        ].join(" ")
      }
    >
      {children}
    </NavLink>
  );
}
