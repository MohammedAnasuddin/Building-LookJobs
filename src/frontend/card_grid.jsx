import React from "react";
import { Container, Typography, Grid, Paper, Button } from "@mui/material";
import "./card_grid.css"; // Import external CSS

const jobData = {
  date: "22-Mar-2025 00:41:25",
  jobs: [
    {
      isNew: true,
      Remote: false,
      job_id: "4189296650",
      job_URL: "https://www.linkedin.com/jobs/view/4189296650/",
      added_on: "2025-03-21",
      job_title: "Content Writer- Fresher",
      job_location: "Hyderabad",
      job_provider: "N/A",
    },
    {
      isNew: true,
      Remote: false,
      job_id: "4189276961",
      job_URL: "https://www.linkedin.com/jobs/view/4189276961/",
      added_on: "2025-03-21",
      job_title: "English Content Writer",
      job_location: "Indore, Madhya Pradesh, India (On-site)",
      job_provider: "CoinGabbar",
    },
    {
      isNew: true,
      Remote: false,
      job_id: "4187996422",
      job_URL: "https://www.linkedin.com/jobs/view/4187996422/",
      added_on: "2025-03-21",
      job_title: "Content Writer",
      job_location: "Gwalior, Madhya Pradesh, India (On-site)",
      job_provider: "ACHARAN PRINTERS PVT LTD",
    },
  ],
};

const JobGrid = () => {
  return (
    <Container maxWidth="md" className="job-container">
      {/* Header */}
      <Typography variant="h2" className="job-title">
        Writer
      </Typography>
      <Typography variant="h5" className="job-location">
        Hyderabad
      </Typography>

      {/* Job Grid */}
      <Grid container spacing={3} justifyContent="center">
        {jobData.jobs.map((job) => (
          <Grid item xs={12} sm={6} md={4} key={job.job_id}>
            <Paper elevation={3} className="job-card">
              <Typography variant="h6" className="job-card-title">
                {job.job_title}
              </Typography>
              <Typography variant="body2" className="job-card-location">
                {job.job_location}
              </Typography>
              <Typography variant="body2" className="job-card-provider">
                {job.job_provider !== "N/A" ? job.job_provider : "Company Unavailable"}
              </Typography>
              <Button
                variant="contained"
                className="apply-button"
                href={job.job_URL}
                target="_blank"
              >
                Apply Now
              </Button>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default JobGrid;
