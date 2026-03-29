import mongoose from "mongoose";
import dotenv from "dotenv";
import Landing from "../models/Landing.js";
import path from "path";
import { fileURLToPath } from "url";

// ==== CONFIG ====
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, "../.env") });

// ==== DATA TO SEED ====
const landingData = {
  hero: {
    title: "Welcome to Blizzen Creations",
    subtitle: "Your IT Career Starts Here",
    cta: "Enroll Now",
  },
  about: {
    description: "Blizzen Creations is a premier IT training institute empowering students with industry-ready skills.",
  },
  courses: [
    {
      title: "Fullstack Development",
      duration: "3 Months",
      careerOpportunities: "Frontend Developer, Backend Developer, Fullstack Developer",
      technologies: ["React", "Node.js", "MongoDB"],
      roles: ["Developer"],
    },
    {
      title: "Data Science",
      duration: "4 Months",
      careerOpportunities: "Data Analyst, Data Scientist",
      technologies: ["Python", "SQL", "Machine Learning"],
      roles: ["Analyst", "Scientist"],
    },
  ],
  features: [
    { title: "Industry-Focused", description: "Curriculum designed with current market demands" },
    { title: "Expert Mentorship", description: "Learn from working IT professionals" },
    { title: "Job-Ready Skills", description: "Hands-on projects to prepare for real-world jobs" },
  ],
  stats: [
    { label: "Students Trained", value: "500+" },
    { label: "Courses", value: "10+" },
    { label: "Placements", value: "100%+" },
  ],
  testimonials: [
    { name: "John Doe", role: "Software Engineer", quote: "Blizzen Creations completely transformed my career. Within 2 months, I got placed in a good company. Highly recommended!", rating: 5 },
    { name: "Jane Smith", role: "Data Analyst", quote: "The trainers are very supportive and classes are fully practical. Best IT training institute in Chennai!", rating: 5 },
  ],
  contact: {
    phone: "+91 9884264816",
    email: "blizzencreations@gmail.com",
    address: "Anna Nagar, Chennai, India",
  },
};

// ==== CONNECT AND SEED ====
mongoose
  .connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log("✓ MongoDB connected");

    const existing = await Landing.findOne();
    if (existing) {
      console.log("⚠ Landing data already exists. Updating...");
      existing.set(landingData);
      await existing.save();
      console.log("✅ Landing data updated successfully");
    } else {
      await Landing.create(landingData);
      console.log("✅ Landing data seeded successfully");
    }

    process.exit(0);
  })
  .catch((err) => {
    console.error("✗ MongoDB connection failed:", err);
    process.exit(1);
  });
