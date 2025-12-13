import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import HeaderMegaMenu from "../Home/Header/Header";
import JobFormModal from "./Job_Form";
import CardsGrid from "./cards_grid";

export default function Dashboard() {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const userId = user?.sub;

  // CORE STATES
  const [jobId, setJobId] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [hasRequestedJob, setHasRequestedJob] = useState(false);
  const [isScraping, setIsScraping] = useState(false);
  const [loading, setLoading] = useState(true);

  /* ----------------------------------
     1️⃣ FETCH USER PROFILE
  -----------------------------------*/
  useEffect(() => {
    if (!userId) return;

    const fetchProfile = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/user/profile/${userId}`
        );
        const data = await res.json();

        if (data.job_id) {
          setJobId(data.job_id);
          setHasRequestedJob(true);
        } else {
          setJobId(null);
          setHasRequestedJob(false);
        }
      } catch (err) {
        console.error("❌ Profile fetch failed", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [userId]);

  /* ----------------------------------
     2️⃣ FETCH + POLL JOBS WHEN jobId EXISTS
  -----------------------------------*/
  useEffect(() => {
    if (!jobId) return;

    let intervalId;

    const fetchJobs = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/jobs/${jobId}`);
        const data = await res.json();

        const dates = Object.keys(data.jobs_by_date || {}).sort();
        const latestDate = dates.at(-1);
        const latestJobs = data.jobs_by_date?.[latestDate] || [];

        if (latestJobs.length > 0) {
          setJobs(latestJobs);
          setIsScraping(false); // ✅ stop loader
          clearInterval(intervalId); // ✅ stop polling
        }
      } catch (err) {
        console.error("❌ Jobs fetch failed", err);
      }
    };

    // First fetch
    fetchJobs();

    // Poll only while scraping
    if (isScraping) {
      intervalId = setInterval(fetchJobs, 5000);
    }

    return () => clearInterval(intervalId);
  }, [jobId, isScraping]);

  /* ----------------------------------
     LOADING STATE
  -----------------------------------*/
  if (isLoading || loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-slate-100">
        <div className="flex flex-col items-center gap-4">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-700 border-t-indigo-500" />
          <p className="text-sm text-slate-400">Preparing your dashboard…</p>
        </div>
      </div>
    );
  }

  /* ----------------------------------
     RENDER
  -----------------------------------*/
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <HeaderMegaMenu />

      <main className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8 py-10 space-y-8">
        {/* Header */}
        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-semibold">
            Welcome back, {user?.name}
          </h1>
        </div>

        {/* First-time user */}
        {!hasRequestedJob && (
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
            <h2 className="text-lg font-medium">Start your job search</h2>
            <p className="mt-1 text-sm text-slate-400">
              Tell us what roles you’re looking for and we’ll fetch
              opportunities for you daily.
            </p>

            <div className="mt-4">
              <JobFormModal
                userId={userId}
                user={user}
                onSuccess={(newJobId) => {
                  setJobId(newJobId);
                  setHasRequestedJob(true);
                  setIsScraping(true); // ✅ start polling
                }}
              />
            </div>
          </div>
        )}

        {/* Scraping state */}
        {hasRequestedJob && isScraping && (
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 flex items-center gap-4">
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-slate-600 border-t-indigo-500" />
            <p className="text-sm text-slate-300">
              Fetching the latest jobs for you. This may take a moment…
            </p>
          </div>
        )}

        {/* Jobs */}
        {jobs.length > 0 && (
          <section className="space-y-4">
            <CardsGrid jobs={jobs} />
          </section>
        )}
      </main>
    </div>
  );
}
