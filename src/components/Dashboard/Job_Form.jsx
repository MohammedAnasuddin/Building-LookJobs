import { useState } from "react";

function JobFormModal({ userId, onSuccess }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const [formData, setFormData] = useState({
    job_title: "",
    location: "",
    canRemote: false,
    willIntern: false,
    isFresher: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.job_title || !formData.location) {
      alert("Job Title and Location required");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("http://localhost:5000/api/add-job", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, userId }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("success");
        onSuccess(data.jobId);
        setOpen(false);
      } else {
        setMessage("error");
      }
    } catch {
      setMessage("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Trigger Button */}
      <button
        onClick={() => setOpen(true)}
        className="
          rounded-xl bg-indigo-600
          px-5 py-2.5
          text-sm font-medium text-white
          hover:bg-indigo-500
          transition
        "
      >
        Request Job Update
      </button>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setOpen(false)}
          />

          {/* Modal Card */}
          <div
            className="
            relative z-10 w-full max-w-md
            rounded-2xl bg-slate-900
            p-6 sm:p-8
            shadow-xl
            text-slate-100
          "
          >
            {/* Header */}
            <div className="mb-6 space-y-1">
              <h2 className="text-lg font-semibold">Job Requirements</h2>
              <p className="text-sm text-slate-400">
                Tell us what roles you want us to track for you
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Job title */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Job title
                </label>
                <input
                  type="text"
                  name="job_title"
                  value={formData.job_title}
                  onChange={handleChange}
                  placeholder="e.g. Software Engineer"
                  className="
                    w-full rounded-lg
                    bg-slate-800 border border-slate-700
                    px-3 py-2
                    text-sm
                    focus:outline-none focus:ring-2 focus:ring-indigo-500
                  "
                />
              </div>

              {/* Location */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="e.g. Bangalore, Hyderabad, Chennai"
                  className="
                    w-full rounded-lg
                    bg-slate-800 border border-slate-700
                    px-3 py-2
                    text-sm
                    focus:outline-none focus:ring-2 focus:ring-indigo-500
                  "
                />
              </div>

              {/* Preferences */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <label className="flex items-center gap-2 text-sm text-slate-300">
                  <input
                    type="checkbox"
                    name="isFresher"
                    checked={formData.isFresher}
                    onChange={handleChange}
                    className="accent-indigo-500"
                  />
                  Fresher
                </label>

                <label className="flex items-center gap-2 text-sm text-slate-300">
                  <input
                    type="checkbox"
                    name="canRemote"
                    checked={formData.canRemote}
                    onChange={handleChange}
                    className="accent-indigo-500"
                  />
                  Remote
                </label>

                <label className="flex items-center gap-2 text-sm text-slate-300">
                  <input
                    type="checkbox"
                    name="willIntern"
                    checked={formData.willIntern}
                    onChange={handleChange}
                    className="accent-indigo-500"
                  />
                  Internship
                </label>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="
                  w-full rounded-xl
                  bg-indigo-600
                  py-2.5
                  text-sm font-medium text-white
                  hover:bg-indigo-500
                  transition
                  disabled:opacity-60
                "
              >
                {loading ? "Submitting…" : "Submit request"}
              </button>

              {/* Message */}
              {message === "error" && (
                <p className="text-sm text-red-400 text-center">
                  Failed to submit job request
                </p>
              )}
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default JobFormModal;
