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

  /* ---------------- FETCH JOB RESULTS ---------------- */
  useEffect(() => {
    if (!jobId) return;

    const fetchJobs = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/jobs/${jobId}`);
        const data = await res.json();
        setJobsByDate(data.jobs_by_date || {});
        setIsScraping(false);
      } catch (e) {
        console.error(e);
      }
    };

    fetchJobs();
  }, [jobId]);

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

          {jobTitle && <p className="text-lg text-slate-300">{jobTitle}</p>}
        </div>

        {/* FIRST TIME */}
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

        {/* LOADER */}
        {isScraping && <p className="text-slate-400">Fetching jobs…</p>}

        {/* RESULTS */}
        {Object.keys(jobsByDate).length > 0 && (
          <CardsGrid jobsByDate={jobsByDate} />
        )}
      </main>
    </div>
  );
}
