// src/routes/AppRouter.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import Landing from "../pages/Landing";
import Register from "../pages/Register";

import Login from "../pages/Login";
import CitizenDashboard from "../pages/CitizenDashboard";
import OfficerDashboard from "../pages/OfficerDashboard";
import AdminDashboard from "../pages/AdminDashboard";
import NewRegistration from "../pages/NewRegistration";
import Renewal from "../pages/Renewal";
import ApplicationDetails from "../pages/ApplicationDetails";
import ProtectedRoute from "../components/common/ProtectedRoute";
import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";

export default function AppRouter() {
  return (
    <div className="app-container">
      <Navbar />
      <div className="app-body">
        <Sidebar />
        <main className="app-main">
          <Routes>
            {/* Public */}
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />


            {/* Citizen */}
            <Route
              path="/citizen/dashboard"
              element={
                <ProtectedRoute allowedRoles={["CITIZEN"]}>
                  <CitizenDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/citizen/new-registration"
              element={
                <ProtectedRoute allowedRoles={["CITIZEN"]}>
                  <NewRegistration />
                </ProtectedRoute>
              }
            />
            <Route
              path="/citizen/renewal"
              element={
                <ProtectedRoute allowedRoles={["CITIZEN"]}>
                  <Renewal />
                </ProtectedRoute>
              }
            />
            <Route
              path="/citizen/applications/:id"
              element={
                <ProtectedRoute allowedRoles={["CITIZEN"]}>
                  <ApplicationDetails />
                </ProtectedRoute>
              }
            />

            {/* Officer */}
            <Route
              path="/officer/dashboard"
              element={
                <ProtectedRoute allowedRoles={["OFFICER"]}>
                  <OfficerDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/officer/applications/:id"
              element={
                <ProtectedRoute allowedRoles={["OFFICER"]}>
                  <ApplicationDetails />
                </ProtectedRoute>
              }
            />

            {/* Admin */}
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute allowedRoles={["ADMIN"]}>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>
      </div>
    </div>
  );
}
