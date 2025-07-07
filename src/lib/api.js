// lib/api.js
export const WP_API_BASE = "http://localhost/wordpress/wp-json/custom/v1";

export const fetchData = async (endpoint) => {
  try {
    const res = await fetch(`${WP_API_BASE}${endpoint}`);
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    return res.json();
  } catch (error) {
    console.error("API fetch error:", error);
    throw error;
  }
};
