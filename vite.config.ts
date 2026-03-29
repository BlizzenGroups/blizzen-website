import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  // Dev server settings
  server: {
    host: "::",          // allow access from any network host
    port: 8080,
    proxy: {
      "/api": {
        target: "http://localhost:5001", // local backend for development
        changeOrigin: true,
        secure: false,
      },
    },
  },

  // Preview / production server settings (Render / Vercel)
  preview: {
    host: true, // allow network access
    port: 4173, // default preview port
    allowedHosts: [
      "blizzen-creations-deploy.onrender.com", // Render host
      "your-frontend.vercel.app",              // Vercel host
    ],
  },

  plugins: [
    react(),
    mode === "development" && componentTagger(),
  ].filter(Boolean),

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },

  define: {
    "process.env": process.env, // allow use of environment variables
  },

  build: {
    outDir: "dist",
    chunkSizeWarningLimit: 1000, // prevent unnecessary warnings for large chunks
  },
}));
