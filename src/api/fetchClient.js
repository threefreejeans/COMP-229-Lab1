// src/api/fetchClient.js
const BASE_URL =
  (typeof window !== "undefined" && import.meta?.env?.VITE_API_URL) ||
  // fallback for other setups
  (typeof process !== "undefined" && process.env.REACT_APP_API_URL) ||
  "http://localhost:3000";

export async function apiFetch(path, options = {}) {
  const url = `${BASE_URL}${path}`;
  const headers = options.headers ? { ...options.headers } : {};
  const isFormData = options.body instanceof FormData;

  if (!isFormData) headers["Content-Type"] = headers["Content-Type"] || "application/json";

  const token = localStorage.getItem("token");
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const config = {
    method: options.method || "GET",
    headers,
    credentials: options.credentials || "same-origin"
  };

  if (options.body !== undefined) {
    config.body = isFormData ? options.body : JSON.stringify(options.body);
  }

  const res = await fetch(url, config);

  if (!res.ok) {
    const text = await res.text();
    let data;
    try { data = text ? JSON.parse(text) : null; } catch { data = text; }
    const error = (data && (data.error || data.message)) || res.statusText || `HTTP ${res.status}`;
    throw new Error(error);
  }

  return res.status === 204 ? null : res.json();
}

export default apiFetch;
