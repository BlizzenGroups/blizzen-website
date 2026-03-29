
"use client";

/**
 * Production-ready API client for Gallery + Landing pages
 * Works with Vite & Next.js
 */

export const API_BASE_URL = (() => {
  // 1️⃣ Use environment variable if provided
  if (import.meta.env.VITE_API_URL) return import.meta.env.VITE_API_URL;
  if (process.env.NEXT_PUBLIC_API_URL) return process.env.NEXT_PUBLIC_API_URL;

  // 2️⃣ Client-side check for frontend domain
  if (typeof window !== "undefined") {
    const host = window.location.hostname;
    const prodFrontends = [
      "www.blizzencreations.in",
      "blizzen-creations-git-main-zenelaits-projects.vercel.app",
      "blizzen-creations-ec552rl3u-zenelaits-projects.vercel.app",
    ];

    if (prodFrontends.includes(host)) {
      return "https://blizzen-creations-deploy.onrender.com";
    }
  }

  // 3️⃣ Default local dev
  return "http://localhost:5001";
})();

/**
 * Safely get admin token from localStorage (client-only)
 */
export const getToken = async (): Promise<string | null> => {
  if (typeof window === "undefined") return null; // SSR safe

  let token = localStorage.getItem("adminToken") || null;

  // Dev fallback: optionally fetch a dev token if missing
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
 *
 * @param path - endpoint path (e.g., "/api/landing" or "/api/gallery")
 * @param options - fetch options
 * @returns JSON response
 */
export const apiFetch = async <T>(
  path: string,
  options: RequestInit = {}
): Promise<T> => {
  if (typeof window === "undefined") {
    throw new Error("apiFetch can only be used in the browser.");
  }

  // Ensure path starts with a single slash
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  const url = `${API_BASE_URL}${cleanPath}`;

  const token = await getToken();

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...((options.headers as Record<string, string>) || {}),
  };

  const res = await fetch(url, { ...options, headers });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`API request failed: ${res.status} - ${text}`);
  }

  return (await res.json()) as T;
};
