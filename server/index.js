import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

/* ===== ROUTES ===== */
import enquiryRoutes from "./routes/enquiry.js";
import courseRoutes from "./routes/courses.js";
import placementRoutes from "./routes/placements.js";
import placementStatsRoutes from "./routes/placement-stats.js";
import contactInfoRoutes from "./routes/contact-info.js";
import aboutRoutes from "./routes/about.js";
import homeContentRoutes from "./routes/home-content.js";
import uploadRoutes from "./routes/upload.js";
import trustStatsRoutes from "./routes/trust-stats.js";
import footerContentRoutes from "./routes/footer-content.js";
import blogRoutes from "./routes/blog.js";
import navbarRoutes from "./routes/navbar.js";
import galleryRoutes from "./routes/gallery.js";
import landingRoutes from "./routes/landing.routes.js";

/* ===== CONFIG ===== */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, ".env") });

const app = express();
const PORT = process.env.PORT || 5001;

console.log("🚀 Blizzen Creations Backend Starting...");

/* ===== CORS ===== */
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:3000",
      "https://www.blizzencreations.in",
      "https://blizzencreations.in",
        "http://localhost:8080", 
      "http://localhost:8081",
      "https://blizzen-creations-git-main-zenelaits-projects.vercel.app",
      "https://blizzen-creations-ec552rl3u-zenelaits-projects.vercel.app",
    ],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);


// Preflight
app.options("*", cors());

/* ===== BODY PARSERS ===== */
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

/* ===== STATIC FILES ===== */
app.use("/uploads", express.static(path.join(__dirname, "uploads")));



/* ===== ROOT ROUTE (IMPORTANT) ===== */
app.get("/", (req, res) => {
  res.send("🚀 Blizzen Creations Backend is running");
});

/* ===== DATABASE ===== */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✓ MongoDB connected"))
  .catch((err) => {
    console.error("✗ MongoDB connection failed:", err);
    process.exit(1);
  });

/* ===== API ROUTES ===== */
app.use("/api/enquiries", enquiryRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/placements", placementRoutes);
app.use("/api/placement-stats", placementStatsRoutes);
app.use("/api/contact-info", contactInfoRoutes);
app.use("/api/about", aboutRoutes);
app.use("/api/home-content", homeContentRoutes);
app.use("/api/trust-stats", trustStatsRoutes);
app.use("/api/footer-content", footerContentRoutes);
app.use("/api/blog", blogRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/navbar", navbarRoutes);
app.use("/api/landing", landingRoutes);
app.use("/api/gallery", galleryRoutes);

/* ===== HEALTH CHECK ===== */
app.get("/api/health", (req, res) => {
  res.json({
    status: "OK",
    server: "Blizzen Creations Backend",
    time: new Date(),
  });
});

/* ===== ERROR HANDLER ===== */
app.use((err, req, res, next) => {
  console.error("🔥 Error:", err);
  res.status(500).json({ error: err.message });
});

/* ===== START SERVER ===== */
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
