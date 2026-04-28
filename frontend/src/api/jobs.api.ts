const API_BASE = import.meta.env.VITE_API_URL;

// 🔹 Create Job
export const createJob = async (data: {
  token: string; // 🔥 NEW
  job_title: string;
  location: string;
  canRemote?: boolean;
  isFresher?: boolean;
  willIntern?: boolean;
}) => {
  const { token, ...body } = data;

  const res = await fetch(`${API_BASE}/api/jobs/add-job`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, // 🔥 CRITICAL
    },
    body: JSON.stringify(body), // 🚫 NO userId anymore
  });

  const result = await res.json();

  if (!res.ok) {
    throw new Error(result.message || "Failed to create job");
  }

  return result;
};

// 🔹 Get Job Updates
export const getJobUpdates = async (jobId: string) => {
  const res = await fetch(`${API_BASE}/api/jobs/${jobId}`, {
    // 🔐 You can add auth later here too if needed
  });

  const result = await res.json();

  if (!res.ok) {
    throw new Error(result.message || "Failed to fetch job updates");
  }

  return result;
};