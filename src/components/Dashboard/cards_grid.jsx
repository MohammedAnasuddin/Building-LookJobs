// INLINE SOURCE DETECTOR
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

function formatDate(dateString) {
  if (!dateString) return "";
  const [year, month, day] = dateString.split("-");
  return `${day}-${month}-${year}`;
}

function CardsGrid({ jobs }) {
  // Group jobs by date
  const jobsByDate = jobs.reduce((acc, job) => {
    const date = job.added_on || "Unknown Date";
    acc[date] = acc[date] || [];
    acc[date].push(job);
    return acc;
  }, {});

  const sortedDates = Object.keys(jobsByDate).sort().reverse();

  return (
    <div className="space-y-14">
      {sortedDates.map((date) => (
        <section key={date} className="space-y-6">
          {/* Date + Opportunities pills */}
          <div className="mt-6 flex flex-wrap gap-4">
            <div className="rounded-xl bg-slate-900 px-4 py-2">
              <p className="text-xs text-slate-400">Date</p>
              <p className="text-lg font-semibold text-slate-100">
                {formatDate(date)}
              </p>
            </div>

            <div className="rounded-xl bg-slate-900 px-4 py-2">
              <p className="text-xs text-slate-400">Jobs Found</p>
              <p className="text-lg font-semibold text-slate-100">
                {jobsByDate[date].length}
              </p>
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {jobsByDate[date].map((job, idx) => (
              <article
                key={idx}
                className="
                  flex flex-col
                  rounded-2xl
                  border border-slate-800
                  bg-slate-900
                  p-6
                  shadow-sm
                  transition
                  hover:border-slate-700
                  hover:shadow-md
                "
              >
                {/* Job Info */}
                <div className="space-y-2">
                  <h3 className="text-base font-semibold leading-snug text-slate-100">
                    {job.job_title}
                  </h3>

                  <p className="text-sm text-slate-400">
                    {job.job_provider || "Unknown Provider"}
                  </p>
                </div>

                {/* Spacer */}
                <div className="flex-1" />

                {/* Footer: Source (left) + Apply (right) */}
                <div className="mt-6 flex items-center justify-between gap-4">
                  <span className="text-xs text-slate-400">
                    {detectJobSource(job)}
                  </span>

                  <a
                    href={job.job_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                      inline-flex items-center justify-center
                      rounded-xl
                      bg-indigo-600
                      px-5 py-2.5
                      text-sm font-medium
                      text-white
                      transition
                      hover:bg-indigo-500
                    "
                  >
                    Apply Now
                  </a>
                </div>
              </article>
            ))}
          </div>

          {/* Divider */}
          <div className="h-px w-full bg-slate-800" />
        </section>
      ))}
    </div>
  );
}

export default CardsGrid;
