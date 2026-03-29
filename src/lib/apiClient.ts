// src/lib/apiClient.ts
"use client";

/**
 * Get the base API URL depending on environment.
 */
export const API_BASE_URL = (() => {
  if (import.meta.env.VITE_API_URL) return import.meta.env.VITE_API_URL;

  if (typeof window !== "undefined") {
    const host = window.location.hostname;
    // Production frontend domains
    const prodFrontends = [
      "www.blizzencreations.in",
      "blizzen-creations-git-main-zenelaits-projects.vercel.app",
      "blizzen-creations-ec552rl3u-zenelaits-projects.vercel.app",
      "https://localhost:8081",
    ];

    if (prodFrontends.includes(host)) {
      return "https://blizzen-creations-deploy.onrender.com/api";
    }
  }

  // Local dev fallback
  return "http://localhost:5001/api";
})();

/**
 * Get admin token from localStorage (client-only)
 */
export const getToken = async (): Promise<string | null> => {
  if (typeof window === "undefined") return null; // safe SSR

  let token = localStorage.getItem("adminToken") || null;

  // Optionally fetch a dev token if missing
  if (!token && import.meta.env.DEV) {
    try {
      const res = await fetch(`${API_BASE_URL}/token`);
      if (!res.ok) throw new Error("Failed to get dev token");
      const data = await res.json();
      token = data.token;
      localStorage.setItem("adminToken", token);
    } catch (err) {
      console.error("Error fetching dev token:", err);
      return null;
    }
  }

  return token;
};

/**
 * Production-safe API fetch wrapper
 */
export const apiFetch = async (path: string, options: RequestInit = {}) => {
  if (typeof window === "undefined") {
    // Only use in client
    throw new Error("apiFetch can only be used in the browser.");
  }

  const token = await getToken();

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...((options.headers as Record<string, string>) || {}),
  };

  const res = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers,
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`API request failed: ${res.status} - ${text}`);
  }

  return await res.json();
};
