import { NavLink, Outlet } from "react-router-dom";

export function AppLayout() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Top Navigation */}
      <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-[820px] items-center justify-between px-4">
          <h1 className="text-sm font-semibold tracking-tight">LookJobs</h1>

          <div className="hidden md:block text-sm text-muted-foreground">
            Profile
          </div>
        </div>
      </header>

      {/* Main Feed */}
      <main className="mx-auto min-h-screen max-w-[820px] px-4 py-6 pb-24">
        <Outlet />
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 border-t border-border bg-background/95 backdrop-blur md:hidden">
        <div className="mx-auto flex h-16 max-w-md items-center justify-around">
          <NavItem to="/">Home</NavItem>
          <NavItem to="/bookmarks">Saved</NavItem>
          <NavItem to="/profile">Profile</NavItem>
        </div>
      </nav>
    </div>
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
