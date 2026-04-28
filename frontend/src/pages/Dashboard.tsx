import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

import { useCreateJob } from "../hooks/useCreateJob";
import { useJobs } from "../hooks/useJobs";

import JobForm from "../components/JobForm";
import JobResults from "../components/JobResults";

export default function Dashboard() {
  const {
    loginWithRedirect,
    getAccessTokenSilently,
    isLoading,
    isAuthenticated,
  } = useAuth0();

  

  const [jobId, setJobId] = useState<string | null>(null);

  const createJobMutation = useCreateJob();
  const jobsQuery = useJobs(jobId);

  if (isLoading) return <div>Loading...</div>;

  if (!isAuthenticated) {
    return (
      <div>
        <h2>You are not logged in</h2>
        <button onClick={() => loginWithRedirect()}>Login</button>
      </div>
    );
  }


  const testToken = async () => {
    const token = await getAccessTokenSilently();
    console.log("TOKEN:", token);
  };

  testToken();

  // 🔥 CREATE JOB (with token)
  const handleCreateJob = async (formData: any) => {
    try {
      const token = await getAccessTokenSilently();

      createJobMutation.mutate(
        {
          ...formData,
          token, // 🔥 send token only
        },
        {
          onSuccess: (data) => {
            setJobId(data.jobId);
          },
        },
      );
    } catch (err) {
      console.error("❌ Token error:", err);
    }
  };

  const jobsByDate = jobsQuery.data?.jobs_by_date || {};

  return (
    <div>
      <h1>Dashboard</h1>

      {/* FORM */}
      {!jobId && <JobForm onSubmit={handleCreateJob} />}

      {/* SCRAPING STATE */}
      {jobId && Object.keys(jobsByDate).length === 0 && (
        <p>Scraping jobs... please wait</p>
      )}

      {/* RESULTS */}
      {Object.keys(jobsByDate).length > 0 && (
        <JobResults jobsByDate={jobsByDate} />
      )}
    </div>
  );
}
