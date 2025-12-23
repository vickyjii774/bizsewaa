// src/components/forms/RenewalForm.jsx
import React, { useState } from "react";

export default function RenewalForm({ businesses, onSubmit, loading }) {
  const [selectedBusinessId, setSelectedBusinessId] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedBusinessId) return;
    onSubmit(selectedBusinessId);
  };

  return (
    <form className="card" onSubmit={handleSubmit}>
      <h2>Business Renewal</h2>

      <label>
        Select Business
        <select
          value={selectedBusinessId}
          onChange={(e) => setSelectedBusinessId(e.target.value)}
          required
        >
          <option value="">-- Choose Business --</option>
          {businesses.map((b) => (
            <option key={b.id} value={b.id}>
              {b.registration_no} - {b.business_name}
            </option>
          ))}
        </select>
      </label>

      <button className="btn btn-primary" type="submit" disabled={loading}>
        {loading ? "Submitting..." : "Submit Renewal"}
      </button>
    </form>
  );
}
