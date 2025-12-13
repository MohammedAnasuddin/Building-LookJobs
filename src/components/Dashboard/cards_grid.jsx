// import { useState } from "react";
// import { Card, Text, Button, Input, Grid, Container } from "@mantine/core";
// import { useAuth0 } from "@auth0/auth0-react";
// // const { userId } = req.params;

// // // Fetch jid_array for the user
// // const userQuery = "SELECT jid_array FROM users WHERE user_id = $1";
// // const userResult = await pool.query(userQuery, [userId]);

// // if (userResult.rows.length === 0) {
// //   return res.status(404).json({ error: "User not found" });
// // }

// // const jidArray = userResult.rows[0].jid_array;

// // if (!jidArray || jidArray.length === 0) {
// //   return res.json({ jobs: [] }); // No jobs saved
// // }

// // // Fetch job updates for the jid_array
// // const jobsQuery = `
// //   SELECT job_id, title, company, location, source, uploaded_date
// //   FROM job_updates
// //   WHERE job_id = ANY($1)
// //   ORDER BY uploaded_date DESC
// // `;
// // const jobsResult = await pool.query(jobsQuery, [jidArray]);

// // const jobs = jobsResult.rows;

// const mockJobs = [
//   ];

//   export default function Card_grids() {
//     const [search, setSearch] = useState("");
//     const { user } = useAuth0();
//   const [location, setLocation] = useState("");

//   const filteredJobs = mockJobs.filter(
//     (job) =>
//       job.title.toLowerCase().includes(search.toLowerCase()) &&
//       job.location.toLowerCase().includes(location.toLowerCase())
//   );

//   return (
//     <Container size="lg" className="p-6">
//       <Grid>
//         {filteredJobs.map((job) => (
//           <Grid.Col key={job.id} span={4}>
//             <Card shadow="sm" padding="lg" radius="md" withBorder>
//               <Text weight={600}>{job.title}</Text>
//               <Text size="sm" color="dimmed">
//                 {job.company}
//               </Text>
//               <Button fullWidth mt="md">Apply</Button>
//               <div className="flex justify-between text-sm text-gray-500 mt-2">
//                 <Text>{job.source}</Text>
//                 <Text>{job.uploadedDate}</Text>
//               </div>
//             </Card>
//           </Grid.Col>
//         ))}
//       </Grid>
//     </Container>
//   );
// }

import React from "react";
import jobsUpdates from "./jobs_updates.json"; // Assuming the JSON file is in the same directory
import { Container, Grid, Card, Text, Button } from "@mantine/core"; // Assuming you are using Mantine

function CardsGallery() {
  return (
    <Container size="lg" className="p-6">
      <Grid gutter="lg">
        {jobsUpdates.map((job) => (
          <Grid.Col key={job.job_id} span={4}>
            {" "}
            {/* span=4 ensures 3 cards per row */}
            <Card
              shadow="sm"
              padding="lg"
              radius="md"
              withBorder
              style={{ height: "300px" }}
            >
              {" "}
              {/* Fixed height */}
              <Text weight={600}>{job.job_title}</Text>
              <Text size="sm" color="dimmed">
                {job.job_provider}
              </Text>
              <Button fullWidth mt="md">
                Apply
              </Button>
            </Card>
          </Grid.Col>
        ))}
      </Grid>
    </Container>
  );
}

export default CardsGallery;
