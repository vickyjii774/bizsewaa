// src/components/layout/Navbar.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

export default function Navbar() {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="navbar">
      <div className="navbar-inner">
        <div className="navbar-left">
          <Link to="/" className="navbar-logo">
            <span className="logo-mark">eGov</span>
            <span className="logo-text">Biz Portal</span>
          </Link>
        </div>
        <div className="navbar-right">
          {isAuthenticated && user ? (
            <>
              <span className="navbar-user">
                <span className="user-name">{user.name}</span>
                <span className="user-role">{user.role}</span>
              </span>
              <button className="btn btn-ghost" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="btn btn-ghost">
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
