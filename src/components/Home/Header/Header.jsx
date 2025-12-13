import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

export default function HeaderMegaMenu() {
  const navigate = useNavigate();
  const { logout } = useAuth0();

  return (
    <header className="w-full bg-slate-950">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Left side (logo / app name) */}
        <div
          onClick={() => navigate("/dashboard")}
          className="
  text-lg
  sm:text-xl
  lg:text-2xl
  font-bold text-slate-100 tracking-tight
"
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
