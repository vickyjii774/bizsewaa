// src/context/AuthContext.jsx
import React, { createContext, useEffect, useState } from "react";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // { id, name, email, role }
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // Safely parse JSON from localStorage
  const loadFromStorage = () => {
    const savedToken = localStorage.getItem("token");
    const savedUserRaw = localStorage.getItem("user");

    if (savedToken && savedUserRaw) {
      try {
        const savedUser = JSON.parse(savedUserRaw);
        setToken(savedToken);
        setUser(savedUser);
      } catch (err) {
        console.error("Failed to parse user from localStorage:", err);
        // If corrupted, clear it so it doesn't keep crashing
        localStorage.removeItem("user");
        localStorage.removeItem("token");
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    loadFromStorage();
  }, []);

  const login = (userData, jwtToken) => {
    setUser(userData);
    setToken(jwtToken);
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", jwtToken);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  const value = {
    user,
    token,
    loading,
    login,
    logout,
    isAuthenticated: !!user && !!token,
  };

  return (
    <AuthContext.Provider value={value}>
      {/* Only render children after we finish checking localStorage */}
      {!loading && children}
    </AuthContext.Provider>
  );
}
