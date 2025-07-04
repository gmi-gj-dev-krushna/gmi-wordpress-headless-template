// lib/api.js
export const WP_API_BASE = "http://localhost/wordpress/wp-json/custom/v1";

export const fetchData = async (endpoint) => {
  const res = await fetch(`${WP_API_BASE}${endpoint}`);
  if (!res.ok) throw new Error("Failed to fetch data");
  return res.json();
};
