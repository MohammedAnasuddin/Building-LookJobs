import React, { useState } from "react";
import JobForm from "./Job_Form";
import  "./App.css"

function App() {
  const [showForm, setShowForm] = useState(false);

  const handleFormSubmit = (data) => {
    console.log("Submitted Data:", data);
    setShowForm(false);
  };

  return (
    <div>
      <div className="container">
      <h1>LooKJObs Backend Prototype</h1>
      <h1>Batch-12 CSE-B</h1>
      <button onClick={() => setShowForm(true)}>Looking for a JOb</button>
      {showForm && <JobForm onSubmit={handleFormSubmit} onClose={() => setShowForm(false)} />}
      </div>
    </div>
  );
}

export default App;
