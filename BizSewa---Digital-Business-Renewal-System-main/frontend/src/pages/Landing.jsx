// src/pages/Landing.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div className="landing">
      <div className="landing-inner">
        <div className="landing-hero">
          <h1>Digital Business Registration & Renewal System</h1>
          <p>
            A modern e-governance portal that enables citizens to register and
            renew businesses online, while government officers process
            applications efficiently and transparently.
          </p>
          <div className="landing-actions">
            <Link to="/login" className="btn btn-primary">
              Login
            </Link>
            <Link to="/register" className="btn btn-outline">
              Register
            </Link>
          </div>
          <p className="landing-note">
            Built as an academic e-governance project demonstrating real-world
            workflows and role-based access.
          </p>
        </div>

        <div className="landing-grid">
          <div className="card landing-card">
            <h3>For Citizens</h3>
            <p>
              Apply for new business registrations, submit renewals, and track
              status from anywhere at any time.
            </p>
          </div>
          <div className="card landing-card">
            <h3>For Officers</h3>
            <p>
              Review pending applications, approve or reject with remarks, and
              maintain a digital workflow.
            </p>
          </div>
          <div className="card landing-card">
            <h3>For Administration</h3>
            <p>
              Monitor overall system performance and support future extensions
              like fees, reporting, and analytics.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
