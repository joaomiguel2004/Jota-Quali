import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "https://jota-quali.onrender.com",
  timeout: 10000,
});

// Interceptor para adicionar o Token automaticamente
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("@JotaQuali:token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
