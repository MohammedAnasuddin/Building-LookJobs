import { Container, Grid, Card, Text, Button } from "@mantine/core";

function CardsGrid({ jobs }) {
  return (
    <Container size="lg" mt="xl">
      <Grid gutter="lg">
        {jobs.map((job, idx) => (
          <Grid.Col span={4} key={idx}>
            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <Text fw={600}>{job.job_title}</Text>

              <Text size="sm" c="dimmed">
                {job.job_provider || "Unknown Provider"}
              </Text>

              <Button
                component="a"
                href={job.job_url}
                target="_blank"
                fullWidth
                mt="md"
              >
                Apply
              </Button>
            </Card>
          </Grid.Col>
        ))}
      </Grid>
    </Container>
  );
}

export default CardsGrid;
