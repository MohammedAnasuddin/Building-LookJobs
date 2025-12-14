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
  const [jobTitle, setJobTitle] = useState("");
  const [hasRequestedJob, setHasRequestedJob] = useState(false);
  const [isScraping, setIsScraping] = useState(false);
  const [loading, setLoading] = useState(true);

  /* 1️⃣ FETCH USER PROFILE */
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
          setJobTitle(data.job_title); // 👈 IMPORTANT
          setHasRequestedJob(true);
        }
      } catch (err) {
        console.error("Profile fetch failed", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [userId]);

  /* 2️⃣ FETCH JOBS (FULL JSON) */
  useEffect(() => {
    if (!jobId) return;

    let intervalId;

    const fetchJobs = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/jobs/${jobId}`);
        const data = await res.json();

        if (data.jobs_by_date) {
          setJobsByDate(data.jobs_by_date);
          setIsScraping(false);
          clearInterval(intervalId);
        }
      } catch (err) {
        console.error("Jobs fetch failed", err);
      }
    };

    fetchJobs();

    if (isScraping) {
      intervalId = setInterval(fetchJobs, 5000);
    }

    return () => clearInterval(intervalId);
  }, [jobId, isScraping]);

  if (isLoading || loading) {
    return <div className="min-h-screen bg-slate-950" />;
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <HeaderMegaMenu />

      <main className="px-6 py-10 mx-auto space-y-10 max-w-7xl">
        <h1 className="text-2xl font-semibold">Welcome back, {user?.name}</h1>

        {!hasRequestedJob && (
          <JobFormModal
            userId={userId}
            onSuccess={(newJobId) => {
              setJobId(newJobId);
              setHasRequestedJob(true);
              setIsScraping(true);
            }}
          />
        )}

        {Object.keys(jobsByDate).length > 0 && (
          <CardsGrid jobsByDate={jobsByDate} jobTitle={jobTitle} />
        )}
      </main>
    </div>
  );
}
