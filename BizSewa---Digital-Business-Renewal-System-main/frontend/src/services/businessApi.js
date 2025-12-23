// src/services/businessApi.js
import api from "./api";

export async function createBusiness(data) {
  const res = await api.post("/business", data);
  return res.data;
}

export async function getMyBusinesses() {
  const res = await api.get("/business/my");
  return res.data;
}
