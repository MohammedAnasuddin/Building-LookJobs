import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

export default function HeaderMegaMenu() {
  const navigate = useNavigate();
  const { logout } = useAuth0();

  return (
    <header className="w-full bg-slate-950">
      <div className="flex items-center justify-between h-16 px-5 mx-auto max-w-7xl sm:px-6 lg:px-8">
        {/* Left side (logo / app name) */}

        
        <div
          onClick={() => navigate("/dashboard")}
          className="text-lg font-bold tracking-tight sm:text-xl lg:text-2xl text-slate-100"
        >
          LookJobs
        </div>

        {/* Right side (logout) */}
        <button
          onClick={() => logout({ returnTo: window.location.origin })}
          className="
  rounded-md bg-red-600 hover:bg-red-700
  px-4 py-2 text-sm
  sm:px-5 sm:py-2.5 sm:text-base
  font-bold text-white
"
        >
          Logout
        </button>
      </div>
    </header>
  );
}
