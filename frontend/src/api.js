export const API_URL = import.meta.env.VITE_API_URL || "/api";

export async function api(path, options = {}) {
  const token = localStorage.getItem("token");
  const headers = {
    ...(options.body instanceof FormData ? {} : { "Content-Type": "application/json" }),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(options.headers || {})
  };
  const response = await fetch(`${API_URL}${path}`, { ...options, headers });
  const data = response.status === 204
    ? null
    : (response.headers.get("content-type") || "").includes("application/json")
      ? await response.json()
      : await response.blob();
  if (!response.ok) throw new Error(data?.message || "Request failed.");
  return data;
}

export const money = (value) => new Intl.NumberFormat("en-LK", {
  style: "currency",
  currency: "LKR",
  maximumFractionDigits: 0
}).format(Number(value || 0));
