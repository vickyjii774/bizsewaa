// src/services/authApi.js
import api from "./api";

export async function loginRequest(email, password) {
  const res = await api.post("/auth/login", { email, password });
  // Expect backend: { token, user: { id, name, email, role } }
  return res.data;
}

export async function registerCitizen(payload) {
  const res = await api.post("/auth/register", payload);
  return res.data;
}
