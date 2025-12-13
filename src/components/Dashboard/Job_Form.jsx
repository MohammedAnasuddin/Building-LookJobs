import { useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import {
  Modal,
  Button,
  TextInput,
  Checkbox,
  Group,
  Loader,
  Text,
} from "@mantine/core";

function JobFormModal({ userId, onSuccess }) {
  const [opened, { open, close }] = useDisclosure(false);
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
        body: JSON.stringify({
          ...formData,
          userId,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("✅ Job request submitted");
        onSuccess(data.jobId); // 🔥 auto-refresh dashboard
        close();
      } else {
        setMessage("❌ Failed to submit job");
      }
    } catch (err) {
      setMessage("❌ Network error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button
        variant="gradient"
        gradient={{ from: "blue", to: "cyan" }}
        onClick={open}
        mt="lg"
      >
        Request Job Update
      </Button>

      <Modal opened={opened} onClose={close} title="Job Requirements" centered>
        <form onSubmit={handleSubmit}>
          <TextInput
            label="Job Title"
            name="job_title"
            required
            value={formData.job_title}
            onChange={handleChange}
          />

          <TextInput
            label="Location"
            name="location"
            required
            mt="md"
            value={formData.location}
            onChange={handleChange}
          />

          <Group mt="md">
            <Checkbox
              label="Fresher"
              name="isFresher"
              checked={formData.isFresher}
              onChange={handleChange}
            />
            <Checkbox
              label="Remote"
              name="canRemote"
              checked={formData.canRemote}
              onChange={handleChange}
            />
            <Checkbox
              label="Internship"
              name="willIntern"
              checked={formData.willIntern}
              onChange={handleChange}
            />
          </Group>

          <Group mt="lg">
            <Button type="submit" fullWidth disabled={loading}>
              {loading ? <Loader size="sm" /> : "Submit"}
            </Button>
          </Group>

          {message && (
            <Text mt="md" c={message.startsWith("✅") ? "green" : "red"}>
              {message}
            </Text>
          )}
        </form>
      </Modal>
    </>
  );
}

export default JobFormModal;
