import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import HeaderMegaMenu from "../Home/Header/Header";
import JobFormModal from "./Job_Form";
import CardsGrid from "./cards_grid";

export default function Dashboard() {
  const { user, isLoading } = useAuth0();
  const userId = user?.sub;

  const [jobId, setJobId] = useState(null);
  const [jobsByDate, setJobsByDate] = useState({});
  const [jobTitle, setJobTitle] = useState(null);
  const [hasRequestedJob, setHasRequestedJob] = useState(false);
  const [isScraping, setIsScraping] = useState(false);
  const [loading, setLoading] = useState(true);

  /* ---------------- FETCH PROFILE ---------------- */
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
          setJobTitle(data.job_title);
          setHasRequestedJob(true);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [userId]);

  /* ---------------- FETCH JOBS (REUSABLE) ---------------- */
  const fetchJobs = async () => {
    if (!jobId) return;

    try {
      const res = await fetch(`http://localhost:5000/api/jobs/${jobId}`);
      const data = await res.json();

      if (data.jobs_by_date && Object.keys(data.jobs_by_date).length > 0) {
        setJobsByDate(data.jobs_by_date);
        setIsScraping(false); // stop polling when jobs arrive
      }
    } catch (e) {
      console.error(e);
    }
  };

  /* ---------------- INITIAL FETCH ---------------- */
  useEffect(() => {
    if (!jobId) return;
    fetchJobs();
  }, [jobId]);

  /* ---------------- POLLING WHILE SCRAPING ---------------- */
  useEffect(() => {
    if (!isScraping || !jobId) return;

    const interval = setInterval(() => {
      fetchJobs();
    }, 4000);

    return () => clearInterval(interval);
  }, [isScraping, jobId]);

  /* ---------------- LOADING SCREEN ---------------- */
  if (isLoading || loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-white bg-slate-950">
        Loading…
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <HeaderMegaMenu />

      <main className="px-6 py-10 mx-auto space-y-10 max-w-7xl">
        {/* HEADER */}
        <div className="space-y-2">
          <h1 className="text-3xl font-semibold">Welcome back, {user?.name}</h1>
        </div>

        {/* FIRST TIME USER */}
        {!hasRequestedJob && (
          <JobFormModal
            userId={userId}
            onSuccess={(id, title) => {
              setJobId(id);
              setJobTitle(title);
              setHasRequestedJob(true);
              setIsScraping(true);
            }}
          />
        )}

        {/* SPINNER */}
        {isScraping && (
          <div className="flex flex-col items-center justify-center py-24 space-y-4">
            <div className="w-12 h-12 border-4 rounded-full border-slate-700 border-t-sky-500 animate-spin"></div>
        
          </div>
        )}

        {/* RESULTS */}
        {Object.keys(jobsByDate).length > 0 && (
          <>
            {/* JOB TITLE + META */}
            <div className="space-y-1">
              <h2 className="text-2xl font-semibold text-slate-100">
                {jobTitle}
              </h2>
            
            </div>

            <CardsGrid jobsByDate={jobsByDate} />
          </>
        )}
      </main>
    </div>
  );
}
