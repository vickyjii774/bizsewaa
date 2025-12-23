// src/pages/NewRegistration.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BusinessForm from "../components/forms/BusinessForm";
import { createBusiness } from "../services/businessApi";

export default function NewRegistration() {
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (data) => {
    setLoading(true);
    setSuccessMsg("");
    setError("");
    try {
      await createBusiness(data);
      setSuccessMsg("Application submitted successfully.");
      setTimeout(() => navigate("/citizen/dashboard"), 1000);
    } catch (err) {
      console.error(err);
      setError("Failed to submit application.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1>New Business Registration</h1>
          <p className="page-subtitle">
            Provide business details to create a new registration application.
          </p>
        </div>
      </div>

      {successMsg && <div className="alert alert-success">{successMsg}</div>}
      {error && <div className="alert alert-error">{error}</div>}

      <div className="card">
        <BusinessForm onSubmit={handleSubmit} loading={loading} />
      </div>
    </div>
  );
}
