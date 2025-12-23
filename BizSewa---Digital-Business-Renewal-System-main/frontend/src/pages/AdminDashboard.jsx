// src/pages/AdminDashboard.jsx
import React from "react";

export default function AdminDashboard() {
  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1>Admin Dashboard</h1>
          <p className="page-subtitle">
            Overview of system activity, user roles, and configuration.
          </p>
        </div>
      </div>

      <div className="card-grid">
        <div className="card stat-card">
          <h3>Total Users</h3>
          <p className="stat-value">—</p>
          <p className="stat-label">Citizens, Officers & Admins</p>
        </div>

        <div className="card stat-card">
          <h3>Active Businesses</h3>
          <p className="stat-value">—</p>
          <p className="stat-label">Currently registered</p>
        </div>

        <div className="card stat-card">
          <h3>Pending Approvals</h3>
          <p className="stat-value">—</p>
          <p className="stat-label">Waiting for officer action</p>
        </div>
      </div>

      <div className="card">
        <h2>Admin Functions (Demo)</h2>
        <ul className="list">
          <li>Review overall system statistics</li>
          <li>Monitor business registrations and renewals</li>
          <li>Manage officer assignments (future scope)</li>
          <li>Configure business types and fee structures (future scope)</li>
        </ul>
        <p className="text-muted">
          This demo focuses on citizen and officer workflows; admin features can
          be extended for a real e-governance rollout.
        </p>
      </div>
    </div>
  );
}
