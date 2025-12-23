// src/pages/CitizenDashboard.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getMyApplications } from "../services/applicationApi";

export default function CitizenDashboard() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getMyApplications();
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
          <h1>Citizen Dashboard</h1>
          <p className="page-subtitle">
            Register new businesses, renew licenses, and track your applications.
          </p>
        </div>
      </div>

      <div className="card-grid">
        <Link to="/citizen/new-registration" className="card quick-card">
          <h3>New Registration</h3>
          <p>Apply for a new business registration online.</p>
        </Link>

        <Link to="/citizen/renewal" className="card quick-card">
          <h3>Renew Business</h3>
          <p>Submit a renewal request for your existing business.</p>
        </Link>
      </div>

      <div className="card">
        <div className="card-header">
          <h2>My Applications</h2>
          <p className="card-subtitle">
            Track the status of your registration and renewal applications.
          </p>
        </div>

        {loading ? (
          <p>Loading...</p>
        ) : applications.length === 0 ? (
          <p className="text-muted">You have not submitted any applications yet.</p>
        ) : (
          <div className="table-wrapper">
            <table className="table">
              <thead>
                <tr>
                  <th>Application ID</th>
                  <th>Type</th>
                  <th>Status</th>
                  <th>Submitted At</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {applications.map((app) => {
                  const statusClass =
                    app.status === "APPROVED"
                      ? "badge badge-success"
                      : app.status === "REJECTED"
                      ? "badge badge-danger"
                      : "badge badge-warning";

                  return (
                    <tr key={app.id}>
                      <td>{app.id}</td>
                      <td>{app.type}</td>
                      <td>
                        <span className={statusClass}>{app.status}</span>
                      </td>
                      <td>{app.submitted_at}</td>
                      <td>
                        <Link
                          to={`/citizen/applications/${app.id}`}
                          className="btn btn-link"
                        >
                          View
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
