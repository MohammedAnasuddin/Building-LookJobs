import { Button, Container } from "@mantine/core";
import { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import HeaderMegaMenu from "../Home/Header/Header";
import JobFormModal from "./Job_Form";
import CardsGallery from "./cards_grid";

export default function Dashboard() {
  const { user, isAuthenticated, isLoading } = useAuth0();

  const [jobId, setJobId] = useState(null); // backend se aayega
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isAuthenticated) {
      // TODO: replace with backend call
      setTimeout(() => {
        setJobId(null); // try "job_123" to test cards
        setLoading(false);
      }, 500);
    }
  }, [isAuthenticated]);

  if (isLoading || loading) {
    return <p style={{ textAlign: "center" }}>Loading...</p>;
  }

  return (
    <>
      <HeaderMegaMenu />

      <Container size="lg" style={{ marginTop: "4rem" }}>
        <h1>Welcome, {user?.name}</h1>

        {/* ❌ NO job_id */}
        {!jobId && (
          <div style={{ marginTop: "2rem", textAlign: "center" }}>
            <JobFormModal />
          </div>
        )}

        {/* ✅ HAS job_id */}
        {jobId && <CardsGallery />}
      </Container>
    </>
  );
}
