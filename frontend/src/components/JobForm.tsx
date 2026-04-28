import { useState } from "react";

type JobFormProps = {
  onSubmit: (data: {
    job_title: string;
    location: string;
    canRemote?: boolean;
    isFresher?: boolean;
    willIntern?: boolean;
  }) => void;
};

export default function JobForm({ onSubmit }: JobFormProps) {
  const [formData, setFormData] = useState({
    job_title: "",
    location: "",
    canRemote: false,
    isFresher: false,
    willIntern: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.job_title || !formData.location) {
      alert("Job title and location required");
      return;
    }

    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create Job</h2>

      <input
        type="text"
        name="job_title"
        placeholder="Job title"
        value={formData.job_title}
        onChange={handleChange}
      />

      <input
        type="text"
        name="location"
        placeholder="Location"
        value={formData.location}
        onChange={handleChange}
      />

      <label>
        <input
          type="checkbox"
          name="isFresher"
          checked={formData.isFresher}
          onChange={handleChange}
        />
        Fresher
      </label>

      <label>
        <input
          type="checkbox"
          name="canRemote"
          checked={formData.canRemote}
          onChange={handleChange}
        />
        Remote
      </label>

      <label>
        <input
          type="checkbox"
          name="willIntern"
          checked={formData.willIntern}
          onChange={handleChange}
        />
        Internship
      </label>

      <button type="submit">Submit</button>
    </form>
  );
}