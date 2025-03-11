import React, { useState } from "react";
import "./JobForm.css"; // Import the CSS file

const JobForm = ({ onSubmit, onClose }) => {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.job_title || !formData.location) {
      alert("Job Title and Location are mandatory.");
      return;
    }
    onSubmit(formData);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <h2>JOb Requirements</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Job Title: <span className="required">*</span>
            <input type="text" name="job_title" value={formData.job_title} onChange={handleChange} required />
          </label>
          <label>
            Location: <span className="required">*</span>
            <input type="text" name="location" value={formData.location} onChange={handleChange} required />
          </label>
          <div className="checkbox-group">
            <label>
              <input type="checkbox" name="isFresher" checked={formData.isFresher} onChange={handleChange} /> Fresher
            </label>
            <label>
              <input type="checkbox" name="canRemote" checked={formData.canRemote} onChange={handleChange} /> Can Work Remotely
            </label>
            <label>
              <input type="checkbox" name="willIntern" checked={formData.willIntern} onChange={handleChange} /> Willing to Intern
            </label>
          </div>
          <div className="button-group">
            <button type="submit">Submit</button>
            <button type="button" onClick={onClose} className="close-button">Close</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default JobForm;
