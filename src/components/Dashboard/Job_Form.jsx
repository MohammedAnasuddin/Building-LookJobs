// import React, { useState } from "react";
// import "./JobForm.css";

// const JobForm = ({ onClose }) => {
//   const [formData, setFormData] = useState({
//     job_title: "",
//     location: "",
//     canRemote: false,
//     willIntern: false,
//     isFresher: false,
//   });

//   const [loading, setLoading] = useState(false); // State to track API request
//   const [message, setMessage] = useState(""); // State for success/error messages

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData({
//       ...formData,
//       [name]: type === "checkbox" ? checked : value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!formData.job_title || !formData.location) {
//       alert("Job Title and Location are mandatory.");
//       return;
//     }

//     setLoading(true); // Show loading state
//     setMessage("");

//     try {
//       const response = await fetch("http://localhost:5000/api/add-job", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(formData),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         setMessage(`✅ ${data.message} (Job ID: ${data.jobId})`);
//         setFormData({ job_title: "", location: "", canRemote: false, willIntern: false, isFresher: false });
//       } else {
//         setMessage(`❌ Error: ${data.message}`);
//       }
//     } catch (error) {
//       setMessage("❌ Network error. Please try again.");
//     } finally {
//       setLoading(false); // Hide loading state
//     }
//   };

//   return (
//     <div className="modal-overlay">
//       <div className="modal-container">
//         <h2>Job Requirements</h2>
//         <form onSubmit={handleSubmit}>
//           <label>
//             Job Title: <span className="required">*</span>
//             <input type="text" name="job_title" value={formData.job_title} onChange={handleChange} required />
//           </label>
//           <label>
//             Location: <span className="required">*</span>
//             <input type="text" name="location" value={formData.location} onChange={handleChange} required />
//           </label>
//           <div className="checkbox-group">
//             <label>
//               <input type="checkbox" name="isFresher" checked={formData.isFresher} onChange={handleChange} /> Fresher
//             </label>
//             <label>
//               <input type="checkbox" name="canRemote" checked={formData.canRemote} onChange={handleChange} /> Can Work Remotely
//             </label>
//             <label>
//               <input type="checkbox" name="willIntern" checked={formData.willIntern} onChange={handleChange} /> Willing to Intern
//             </label>
//           </div>
//           <div className="button-group">
//             <button type="submit" disabled={loading}>{loading ? "Submitting..." : "Submit"}</button>
//             <button type="button" onClick={onClose} className="close-button">Close</button>
//           </div>
//         </form>
//         {message && <p className="message">{message}</p>}
//       </div>
//     </div>
//   );
// };

// export default JobForm;
//---------------------------------------------------------------


import { useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import { Modal, Button, TextInput, Checkbox, Group, Loader, Text } from "@mantine/core";

function JobFormModal() {
  const [opened, { open, close }] = useDisclosure(false);
  const [formData, setFormData] = useState({
    job_title: "",
    location: "",
    canRemote: false,
    willIntern: false,
    isFresher: false,
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

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
      alert("Job Title and Location are mandatory.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("http://localhost:5000/api/add-job", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(`✅ ${data.message} (Job ID: ${data.jobId})`);
        setFormData({ job_title: "", location: "", canRemote: false, willIntern: false, isFresher: false });
      } else {
        setMessage(`❌ Error: ${data.message}`);
      }
    } catch (error) {
      setMessage("❌ Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button variant="gradient" gradient={{ from: "blue", to: "cyan" }} onClick={open}>
        Open Job Form
      </Button>

      <Modal opened={opened} onClose={close} title="Job Requirements" centered>
        <form onSubmit={handleSubmit}>
          <TextInput label="Job Title" required name="job_title" value={formData.job_title} onChange={handleChange} />
          <TextInput label="Location" required name="location" value={formData.location} onChange={handleChange} mt="md" />

          <Group mt="md">
            <Checkbox label="Fresher" name="isFresher" checked={formData.isFresher} onChange={handleChange} />
            <Checkbox label="Can Work Remotely" name="canRemote" checked={formData.canRemote} onChange={handleChange} />
            <Checkbox label="Willing to Intern" name="willIntern" checked={formData.willIntern} onChange={handleChange} />
          </Group>

          <Group mt="lg">
            <Button type="submit" fullWidth disabled={loading}>
              {loading ? <Loader size="sm" /> : "Submit"}
            </Button>
            <Button variant="outline" color="red" fullWidth onClick={close}>
              Close
            </Button>
          </Group>
        </form>

        {message && <Text color={message.startsWith("✅") ? "green" : "red"} mt="md">{message}</Text>}
      </Modal>
    </>
  );
}

export default JobFormModal;
