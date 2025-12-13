import { Container, Grid, Card, Text, Button, Divider } from "@mantine/core";

// INLINE SOURCE DETECTOR (as discussed)
function detectJobSource(job) {
  const text = `${job.OpportunityID || ""} ${job.job_id || ""} ${
    job.job_URL || ""
  }`.toUpperCase();

  if (text.includes("NKRI") || text.includes("NAUKRI")) return "Naukri";
  if (text.includes("INDD") || text.includes("INDEED")) return "Indeed";
  if (text.includes("INTSH") || text.includes("INTERNSHALA"))
    return "Internshala";
  if (text.includes("LNKD") || text.includes("LINKEDIN")) return "LinkedIn";

  return "Unknown";
}

function CardsGrid({ jobs }) {
  // 🔹 Group jobs by date
  const jobsByDate = jobs.reduce((acc, job) => {
    const date = job.added_on || "Unknown Date";
    acc[date] = acc[date] || [];
    acc[date].push(job);
    return acc;
  }, {});

  const sortedDates = Object.keys(jobsByDate).sort().reverse();

  return (
    <Container size="lg" mt="xl">
      {sortedDates.map((date) => (
        <div key={date}>
          {/* 🗓️ DATE HEADING */}
          <Text size="xl" fw={700} mb="md">
            {date} 
          </Text>
          <Text size="lg" fw={700} mb="md">
            {jobs.length} Jobs
          </Text>

          <Grid gutter="lg">
            {jobsByDate[date].map((job, idx) => (
              <Grid.Col span={4} key={idx}>
                <Card shadow="sm" padding="lg" radius="md" withBorder>
                  <Text fw={600}>{job.job_title}</Text>

                  <Text size="sm" c="dimmed">
                    {job.job_provider || "Unknown Provider"}
                  </Text>

                  <Button
                    component="a"
                    href={job.job_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    fullWidth
                    mt="md"
                  >
                    Apply Now
                  </Button>

                  {/* Source */}
                  <Text size="xs" c="dimmed" mt="sm">
                    {detectJobSource(job)}
                  </Text>
                </Card>
              </Grid.Col>
            ))}
          </Grid>

          {/* ➖ Divider between dates */}
          <Divider my="xl" />
        </div>
      ))}
    </Container>
  );
}

export default CardsGrid;
