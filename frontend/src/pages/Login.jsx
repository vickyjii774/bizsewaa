// src/pages/Login.jsx
import React, { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { loginRequest } from "../services/authApi";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || null;

  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const data = await loginRequest(form.email, form.password);
      login(data.user, data.token);

      if (from) {
        navigate(from, { replace: true });
        return;
      }

      if (data.user.role === "CITIZEN") navigate("/citizen/dashboard");
      else if (data.user.role === "OFFICER") navigate("/officer/dashboard");
      else if (data.user.role === "ADMIN") navigate("/admin/dashboard");
      else navigate("/");
    } catch (err) {
      console.error(err);
      setError("Invalid credentials or server error.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>Sign in</h2>
        <p className="auth-subtitle">
          Use your registered email and password to access the portal.
        </p>

        {error && <div className="alert alert-error">{error}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          <label>
            Email
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Password
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </label>

          <button className="btn btn-primary full-width" type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="auth-footer">
          Not registered yet?{" "}
          <Link to="/register" className="link">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
}
