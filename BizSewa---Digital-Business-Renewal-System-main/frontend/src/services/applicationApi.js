// src/services/applicationApi.js
import api from "./api";

export async function getMyApplications() {
  const res = await api.get("/applications/my");
  return res.data;
}

export async function getOfficerApplications() {
  const res = await api.get("/applications/pending");
  return res.data;
}

export async function getApplicationById(id) {
  const res = await api.get(`/applications/${id}`);
  return res.data;
}

export async function approveApplication(id, remarks) {
  const res = await api.put(`/applications/${id}/approve`, { remarks });
  return res.data;
}

export async function rejectApplication(id, remarks) {
  const res = await api.put(`/applications/${id}/reject`, { remarks });
  return res.data;
}

export async function renewBusiness(businessId) {
  const res = await api.post(`/business/${businessId}/renew`);
  return res.data;
}
