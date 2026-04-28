type Job = {
  job_title: string;
  job_provider: string;
  job_URL: string;
  OpportunityID?: string;
};

type JobsByDate = {
  [date: string]: Job[];
};

type Props = {
  jobsByDate: JobsByDate;
};

function detectJobSource(job: Job) {
  const text = `${job.OpportunityID || ""} ${job.job_URL || ""}`.toUpperCase();

  if (text.includes("NKRI")) return "Naukri";
  if (text.includes("INDD")) return "Indeed";
  if (text.includes("INTSH")) return "Internshala";
  if (text.includes("LNKD")) return "LinkedIn";

  return "Unknown";
}

export default function JobResults({ jobsByDate }: Props) {
  const dates = Object.keys(jobsByDate).sort().reverse();

  return (
    <div>
      {dates.map((date) => {
        const jobs = jobsByDate[date];

        return (
          <div key={date}>
            <h3>{date}</h3>

            {jobs.map((job, idx) => (
              <div key={idx} style={{ border: "1px solid gray", margin: 8, padding: 8 }}>
                <p>{job.job_title}</p>
                <p>{job.job_provider}</p>
                <p>{detectJobSource(job)}</p>

                <a href={job.job_URL} target="_blank">
                  Apply
                </a>
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
}