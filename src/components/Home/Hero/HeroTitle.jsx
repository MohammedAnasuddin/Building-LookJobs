import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import { Github } from "lucide-react";

export default function HeroTitle() {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading } = useAuth0();

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, isLoading, navigate]);

  if (isLoading) return null;

  return (
    <section className="relative flex items-center min-h-screen overflow-hidden bg-slate-950 text-slate-100">
      {/* Background glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-[-35%] h-[500px] w-[500px] sm:h-[650px] sm:w-[650px] lg:h-[800px] lg:w-[800px] -translate-x-1/2 rounded-full bg-indigo-600/20 blur-[140px]" />
      </div>

      <div className="w-full max-w-6xl px-5 mx-auto text-center sm:px-6 lg:px-8">
        {/* Headline */}
        <h1
          className="
          mx-auto max-w-[22rem]
          text-3xl leading-tight font-extrabold
          sm:max-w-xl sm:text-4xl
          md:max-w-2xl md:text-5xl
          lg:max-w-3xl lg:text-6xl
          xl:text-7xl
          font-[Space_Grotesk]
        "
        >
          A{" "}
          <span className="text-transparent whitespace-nowrap bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text">
            Revolution
          </span>{" "}
          <span className="block sm:inline">in the Modern Job Hunt</span>
        </h1>

        {/* Description */}
        <p
          className="
          mx-auto mt-4 max-w-xs text-sm text-slate-400
          sm:mt-6 sm:max-w-md sm:text-base
          md:max-w-lg md:text-lg
          lg:max-w-xl lg:text-xl
          font-[Inter]
        "
        >
          All your new job opportunities, scraped and organized daily on a
          single screen.
        </p>

        {/* Actions */}
        <div
          className="
          mt-8 flex flex-col items-center gap-3
          sm:mt-10 sm:flex-row sm:justify-center sm:gap-4
          font-[Inter]
        "
        >
          <button
            onClick={() => navigate("/login")}
            className="px-6 py-3 text-sm font-medium text-white transition bg-indigo-600 rounded-xl sm:text-base hover:bg-indigo-500"
          >
            Get started
          </button>

          <a
            href="https://github.com/MohammedAnasuddin/Building-LookJobs"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 text-sm transition border rounded-xl border-slate-700 sm:text-base text-slate-300 hover:bg-slate-800 hover:text-white"
          >
            <Github size={18} />
            GitHub
          </a>
        </div>
      </div>
    </section>
  );
}
