// src/components/forms/BusinessForm.jsx
import React, { useState } from "react";

export default function BusinessForm({ onSubmit, loading }) {
  const [form, setForm] = useState({
    businessName: "",
    businessType: "",
    address: "",
    contactNo: "",
  });

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form className="card" onSubmit={handleSubmit}>
      <h2>New Business Registration</h2>

      <label>
        Business Name
        <input
          type="text"
          name="businessName"
          value={form.businessName}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        Business Type
        <input
          type="text"
          name="businessType"
          value={form.businessType}
          onChange={handleChange}
          placeholder="e.g. Retail, IT, Manufacturing"
          required
        />
      </label>

      <label>
        Address
        <input
          type="text"
          name="address"
          value={form.address}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        Contact Number
        <input
          type="text"
          name="contactNo"
          value={form.contactNo}
          onChange={handleChange}
          required
        />
      </label>

      <button className="btn btn-primary" type="submit" disabled={loading}>
        {loading ? "Submitting..." : "Submit Application"}
      </button>
    </form>
  );
}
