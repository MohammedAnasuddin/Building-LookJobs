import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation } from "@tanstack/react-query";

import HeaderMegaMenu from "../Home/Header/Header";

import { createJob } from "@/api/jobs.api";

// 🔹 Type for mutation
type CreateJobInput = {
  userId: string;
  job_title: string;
  location: string;
  canRemote?: boolean;
  isFresher?: boolean;
  willIntern?: boolean;
};

export default function Dashboard() {
  const { user, isLoading } = useAuth0();
  const userId = user?.sub;

  const [jobId, setJobId] = useState<string | null>(null);

  // 🔥 MUTATION (create job)
  const createJobMutation = useMutation({
    mutationFn: (data: CreateJobInput) => createJob(data),

    onSuccess: (data: { jobId: string }) => {
      console.log("✅ Job created:", data);
      setJobId(data.jobId);
    },
  });

  // 🔹 loading state
  if (isLoading) {
    return (
      <div className="text-white bg-slate-950 min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <HeaderMegaMenu />

      <main className="px-6 py-10 space-y-6">
        <h1 className="text-2xl">Welcome, {user?.name}</h1>

        {/* 🔥 TEST BUTTON */}
        <button
          onClick={() => {
            if (!userId) return;

            createJobMutation.mutate({
              userId: userId,
              job_title: "Frontend Developer",
              location: "Remote",
            });
          }}
          className="px-4 py-2 bg-indigo-600 rounded"
        >
          Test Create Job
        </button>

        {/* 🔹 show jobId */}
        {jobId && (
          <p className="text-green-400">
            Created Job ID: {jobId}
          </p>
        )}
      </main>
    </div>
  );
}