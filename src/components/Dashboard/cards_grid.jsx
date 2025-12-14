function detectJobSource(job) {
  const text = `${job.OpportunityID || ""} ${job.job_id || ""}`.toUpperCase();
  if (text.includes("NKRI")) return "Naukri";
  if (text.includes("INDD")) return "Indeed";
  if (text.includes("INTSH")) return "Internshala";
  if (text.includes("LNKD")) return "LinkedIn";
  return "Unknown";
}

function formatDate(date) {
  const [y, m, d] = date.split("-");
  return `${d}-${m}-${y}`;
}

function CardsGrid({ jobsByDate, jobTitle }) {
  const sortedDates = Object.keys(jobsByDate).sort().reverse();

  return (
    <div className="space-y-20">
      {sortedDates.map((date) => {
        const jobs = jobsByDate[date];

        return (
          <section key={date} className="space-y-6">
            {/* HEADER */}
            <div className="flex flex-wrap items-center justify-between gap-4">
              <h2 className="text-xl font-semibold">{jobTitle}</h2>

              <div className="flex gap-4">
                <div className="px-4 py-2 rounded-xl bg-slate-900">
                  <p className="text-xs text-slate-400">Date</p>
                  <p className="text-lg font-semibold">{formatDate(date)}</p>
                </div>

                <div className="px-4 py-2 rounded-xl bg-slate-900">
                  <p className="text-xs text-slate-400">Jobs Found</p>
                  <p className="text-lg font-semibold">{jobs.length}</p>
                </div>
              </div>
            </div>

            {/* CARDS */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {jobs.map((job, idx) => (
                <article
                  key={idx}
                  className="flex flex-col p-6 border rounded-2xl border-slate-800 bg-slate-900"
                >
                  <div>
                    <h3 className="font-semibold">{job.job_title}</h3>
                    <p className="text-sm text-slate-400">{job.job_provider}</p>
                  </div>

                  <div className="flex-1" />

                  <div className="flex items-center justify-between mt-6">
                    <span className="text-xs text-slate-400">
                      {detectJobSource(job)}
                    </span>

                    <a
                      href={job.job_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 text-sm bg-indigo-600 rounded-xl"
                    >
                      Apply Now
                    </a>
                  </div>
                </article>
              ))}
            </div>

            <div className="h-px bg-slate-800" />
          </section>
        );
      })}
    </div>
  );
}

export default CardsGrid;
