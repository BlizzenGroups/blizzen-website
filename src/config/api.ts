// src/apiConfig.ts

// Get the base API URL depending on environment
export const getApiUrl = (): string => {
  if (import.meta.env.VITE_API_URL) return import.meta.env.VITE_API_URL;

  if (typeof window !== "undefined") {
    const host = window.location.hostname;
    if (host === "www.blizzencreations.in" || host === "blizzencreations.in") {
      return "https://api.blizzencreations.com";
    }
  }

  if (import.meta.env.DEV) return "http://localhost:5001";

  return "http://localhost:5001"; // fallback
};

export const API_BASE_URL = getApiUrl();

// Get admin token (fetches dev token if missing)
export const getToken = async (): Promise<string | null> => {
  let token = localStorage.getItem("adminToken");
  if (!token && import.meta.env.DEV) {
    try {
      const res = await fetch(`${API_BASE_URL}/api/token`);
      if (!res.ok) throw new Error("Failed to get token");
      const data = await res.json();
      token = data.token;
      localStorage.setItem("adminToken", token);
    } catch (err) {
      console.error("Error fetching token:", err);
      return null;
    }
  }
  return token;
};
