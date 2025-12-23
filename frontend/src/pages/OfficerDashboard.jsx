// src/pages/OfficerDashboard.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getOfficerApplications } from "../services/applicationApi";

export default function OfficerDashboard() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getOfficerApplications();
        setApplications(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1>Officer Dashboard</h1>
          <p className="page-subtitle">
            Review and process pending registration and renewal applications.
          </p>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h2>Pending Applications</h2>
          <p className="card-subtitle">
            Applications awaiting your approval or rejection.
          </p>
        </div>

        {loading ? (
          <p>Loading...</p>
        ) : applications.length === 0 ? (
          <p className="text-muted">No pending applications at the moment.</p>
        ) : (
          <div className="table-wrapper">
            <table className="table">
              <thead>
                <tr>
                  <th>Application ID</th>
                  <th>Business Name</th>
                  <th>Type</th>
                  <th>Submitted By</th>
                  <th>Submitted At</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {applications.map((app) => (
                  <tr key={app.id}>
                    <td>{app.id}</td>
                    <td>{app.business_name}</td>
                    <td>{app.type}</td>
                    <td>{app.applicant_name}</td>
                    <td>{app.submitted_at}</td>
                    <td>
                      <span className="badge badge-warning">{app.status}</span>
                    </td>
                    <td>
                      <Link
                        to={`/officer/applications/${app.id}`}
                        className="btn btn-link"
                      >
                        Review
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
