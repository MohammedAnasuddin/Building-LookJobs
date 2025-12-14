function detectJobSource(job) {
  const text = `${job.OpportunityID || ""} ${job.job_URL || ""}`.toUpperCase();
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

export default function CardsGrid({ jobsByDate }) {
  const dates = Object.keys(jobsByDate).sort().reverse();

  return (
    <div className="space-y-16">
      {dates.map((date) => {
        const jobs = jobsByDate[date];

        return (
          <section key={date} className="space-y-6">
            {/* DATE + COUNT */}
            <div className="flex gap-4">
              <div className="px-5 py-3 rounded-xl bg-slate-900">
                <p className="text-xs text-slate-400">Date</p>
                <p className="text-lg font-semibold">{formatDate(date)}</p>
              </div>

              <div className="px-5 py-3 rounded-xl bg-slate-900">
                <p className="text-xs text-slate-400">Jobs Found</p>
                <p className="text-lg font-semibold">{jobs.length}</p>
              </div>
            </div>

            {/* CARDS GRID */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {jobs.map((job, idx) => (
                <div
                  key={idx}
                  className="flex flex-col p-6 border rounded-2xl border-slate-800 bg-slate-900"
                >
                  <h3 className="text-base font-semibold">{job.job_title}</h3>

                  <p className="text-sm text-slate-400">{job.job_provider}</p>

                  <div className="flex-1" />

                  <div className="flex items-center justify-between mt-6">
                    <span className="text-xs text-slate-400">
                      {detectJobSource(job)}
                    </span>

                    <a
                      href={job.job_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 text-sm font-medium bg-indigo-600 rounded-xl hover:bg-indigo-500"
                    >
                      Apply Now
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {/* DIVIDER */}
            <div className="h-px bg-slate-800" />
          </section>
        );
      })}
    </div>
  );
}
