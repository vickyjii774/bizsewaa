// src/pages/ApplicationDetails.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import {
  getApplicationById,
  approveApplication,
  rejectApplication,
} from "../services/applicationApi";

export default function ApplicationDetails() {
  const { id } = useParams();
  const { user } = useAuth();
  const [application, setApplication] = useState(null);
  const [remarks, setRemarks] = useState("");
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");

  const isOfficer = user?.role === "OFFICER";

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getApplicationById(id);
        setApplication(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load application.");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  const handleApprove = async () => {
    setActionLoading(true);
    setMsg("");
    setError("");
    try {
      await approveApplication(id, remarks);
      setMsg("Application approved.");
    } catch (err) {
      console.error(err);
      setError("Failed to approve application.");
    } finally {
      setActionLoading(false);
    }
  };

  const handleReject = async () => {
    setActionLoading(true);
    setMsg("");
    setError("");
    try {
      await rejectApplication(id, remarks);
      setMsg("Application rejected.");
    } catch (err) {
      console.error(err);
      setError("Failed to reject application.");
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) return <div className="page">Loading...</div>;
  if (!application) return <div className="page">Application not found.</div>;

  const statusClass =
    application.status === "APPROVED"
      ? "badge badge-success"
      : application.status === "REJECTED"
      ? "badge badge-danger"
      : "badge badge-warning";

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1>Application #{application.id}</h1>
          <p className="page-subtitle">
            Detailed view of the application and business information.
          </p>
        </div>
        <span className={statusClass}>{application.status}</span>
      </div>

      {msg && <div className="alert alert-success">{msg}</div>}
      {error && <div className="alert alert-error">{error}</div>}

      <div className="card-grid">
        <div className="card">
          <h2>Application Info</h2>
          <div className="info-row">
            <span>Type</span>
            <strong>{application.type}</strong>
          </div>
          <div className="info-row">
            <span>Submitted At</span>
            <strong>{application.submitted_at}</strong>
          </div>
          {application.officer_remarks && (
            <div className="info-row">
              <span>Officer Remarks</span>
              <strong>{application.officer_remarks}</strong>
            </div>
          )}
        </div>

        <div className="card">
          <h2>Business Info</h2>
          <div className="info-row">
            <span>Registration No</span>
            <strong>{application.business?.registration_no}</strong>
          </div>
          <div className="info-row">
            <span>Name</span>
            <strong>{application.business?.business_name}</strong>
          </div>
          <div className="info-row">
            <span>Type</span>
            <strong>{application.business?.business_type}</strong>
          </div>
          <div className="info-row">
            <span>Address</span>
            <strong>{application.business?.address}</strong>
          </div>
        </div>
      </div>

      {isOfficer && application.status === "PENDING" && (
        <div className="card">
          <h2>Officer Action</h2>
          <label>
            Remarks
            <textarea
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              rows={3}
              className="textarea"
            />
          </label>
          <div className="actions-row">
            <button
              className="btn btn-primary"
              onClick={handleApprove}
              disabled={actionLoading}
            >
              Approve
            </button>
            <button
              className="btn btn-outline"
              onClick={handleReject}
              disabled={actionLoading}
            >
              Reject
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
