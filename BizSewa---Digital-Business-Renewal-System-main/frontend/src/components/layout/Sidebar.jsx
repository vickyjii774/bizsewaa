// src/components/layout/Sidebar.jsx
import React from "react";
import { Link, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

export default function Sidebar() {
  const { user, isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated || !user) return null;

  const isActive = (path) => (location.pathname.startsWith(path) ? "active" : "");

  return (
    <aside className="sidebar">
      {user.role === "CITIZEN" && (
        <ul>
          <li className={isActive("/citizen/dashboard")}>
            <Link to="/citizen/dashboard">Dashboard</Link>
          </li>
          <li className={isActive("/citizen/new-registration")}>
            <Link to="/citizen/new-registration">New Registration</Link>
          </li>
          <li className={isActive("/citizen/renewal")}>
            <Link to="/citizen/renewal">Renewal</Link>
          </li>
        </ul>
      )}

      {user.role === "OFFICER" && (
        <ul>
          <li className={isActive("/officer/dashboard")}>
            <Link to="/officer/dashboard">Officer Dashboard</Link>
          </li>
        </ul>
      )}

      {user.role === "ADMIN" && (
        <ul>
          <li className={isActive("/admin/dashboard")}>
            <Link to="/admin/dashboard">Admin Dashboard</Link>
          </li>
        </ul>
      )}
    </aside>
  );
}
