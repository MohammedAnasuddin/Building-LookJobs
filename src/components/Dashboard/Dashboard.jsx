import { Container, Loader, Text } from "@mantine/core";
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
     2️⃣ FETCH JOBS WHEN jobId EXISTS
  -----------------------------------*/
  useEffect(() => {
    if (!jobId) return;

    const fetchJobs = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/jobs/${jobId}`);
        const data = await res.json();

        const dates = Object.keys(data.jobs_by_date || {}).sort();
        const latestDate = dates.at(-1);
        const latestJobs = data.jobs_by_date?.[latestDate] || [];

        setJobs(latestJobs);

        if (latestJobs.length > 0) {
          setIsScraping(false);
        }
      } catch (err) {
        console.error("❌ Jobs fetch failed", err);
      }
    };

    fetchJobs();
  }, [jobId]);

  /* ----------------------------------
     LOADING STATE
  -----------------------------------*/
  if (isLoading || loading) {
    return (
      <Container style={{ textAlign: "center", marginTop: "5rem" }}>
        <Loader />
      </Container>
    );
  }

  /* ----------------------------------
     RENDER
  -----------------------------------*/
  return (
    <>
      <HeaderMegaMenu />

      <Container size="lg" style={{ marginTop: "4rem" }}>
        <Text size="xl" fw={600}>
          Welcome, {user?.name}
        </Text>

        {/* 🟡 FIRST TIME USER → SHOW REQUEST BUTTON */}
        {!hasRequestedJob && (
          <JobFormModal
            userId={userId}
            user={user}
            onSuccess={(newJobId) => {
              setJobId(newJobId);
              setHasRequestedJob(true);
              setIsScraping(true);
            }}
          />
        )}

        {/* 🔄 JOB REQUESTED BUT SCRAPING IN PROGRESS */}
        {hasRequestedJob && isScraping && (
          <Text mt="xl">🔄 Fetching jobs for you, please wait...</Text>
        )}

        {/* ✅ JOBS AVAILABLE */}
        {jobs.length > 0 && <CardsGrid jobs={jobs} />}
      </Container>
    </>
  );
}
