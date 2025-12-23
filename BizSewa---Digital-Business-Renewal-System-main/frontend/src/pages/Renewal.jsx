// src/pages/Renewal.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import RenewalForm from "../components/forms/RenewalForm";
import { getMyBusinesses } from "../services/businessApi";
import { renewBusiness } from "../services/applicationApi";

export default function Renewal() {
  const [businesses, setBusinesses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getMyBusinesses();
        setBusinesses(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load businesses.");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const handleSubmit = async (businessId) => {
    setSubmitLoading(true);
    setMsg("");
    setError("");
    try {
      await renewBusiness(businessId);
      setMsg("Renewal application submitted successfully.");
      setTimeout(() => navigate("/citizen/dashboard"), 1000);
    } catch (err) {
      console.error(err);
      setError("Failed to submit renewal.");
    } finally {
      setSubmitLoading(false);
    }
  };

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1>Business Renewal</h1>
          <p className="page-subtitle">
            Select one of your existing businesses to submit a renewal request.
          </p>
        </div>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : businesses.length === 0 ? (
        <div className="card">
          <p>No businesses found to renew.</p>
        </div>
      ) : (
        <div className="card">
          {msg && <div className="alert alert-success">{msg}</div>}
          {error && <div className="alert alert-error">{error}</div>}
          <RenewalForm
            businesses={businesses}
            onSubmit={handleSubmit}
            loading={submitLoading}
          />
        </div>
      )}
    </div>
  );
}
