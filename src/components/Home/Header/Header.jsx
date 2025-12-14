import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

export default function HeaderMegaMenu() {
  const navigate = useNavigate();
  const { logout } = useAuth0();

  return (
    <header className="w-full border-b bg-slate-950 border-slate-800">
      <div className="flex items-center justify-between h-16 px-5 mx-auto max-w-7xl sm:px-6 lg:px-8">
        {/* Left: Logo + App Name */}
        <div
          onClick={() => navigate("/dashboard")}
          className="flex items-center gap-2 transition cursor-pointer select-none text-slate-100 hover:text-indigo-400"
        >
          {/* Eye SVG Logo */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            className="w-5 h-5 text-indigo-400 sm:w-6 sm:h-6"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M4.75 5.5c.427 0 .791.163 1.075.45c-.145-.778-.37-1.415-.64-1.894C4.72 3.236 4.216 3 3.75 3s-.97.237-1.434 1.056C1.835 4.906 1.5 6.25 1.5 8s.335 3.094.816 3.944c.463.82.967 1.056 1.434 1.056s.97-.237 1.434-1.056c.272-.48.496-1.116.64-1.895a1.47 1.47 0 0 1-1.074.451C3.674 10.5 3 9.47 3 8s.674-2.5 1.75-2.5M7.5 8c0 3.822-1.445 6.5-3.75 6.5S0 11.822 0 8s1.445-6.5 3.75-6.5S7.5 4.178 7.5 8m6.825 2.05c-.145.778-.37 1.415-.64 1.894c-.464.82-.968 1.056-1.435 1.056s-.97-.237-1.434-1.056C10.335 11.094 10 9.75 10 8s.335-3.094.816-3.944C11.279 3.236 11.783 3 12.25 3s.97.237 1.434 1.056c.272.48.496 1.116.64 1.895A1.47 1.47 0 0 0 13.25 5.5c-1.076 0-1.75 1.03-1.75 2.5s.674 2.5 1.75 2.5a1.47 1.47 0 0 0 1.075-.45M16 8c0 3.822-1.445 6.5-3.75 6.5S8.5 11.822 8.5 8s1.445-6.5 3.75-6.5S16 4.178 16 8"
            />
          </svg>

          {/* App Name */}
          <span className="text-lg font-bold tracking-tight sm:text-xl lg:text-2xl">
            LookJobs
          </span>
        </div>

        {/* Right: Logout */}
        <button
          onClick={() => logout({ returnTo: window.location.origin })}
          className="
            rounded-md bg-red-600 hover:bg-red-700
            px-4 py-2 text-sm
            sm:px-5 sm:py-2.5 sm:text-base
            font-bold text-white transition
          "
        >
          Logout
        </button>
      </div>
    </header>
  );
}
