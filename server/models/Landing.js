import mongoose from "mongoose";

const LandingSchema = new mongoose.Schema({
  hero: { title: String, subtitle: String, cta: String },
  about: { description: String },
  courses: [
    {
      title: String,
      duration: String,
      careerOpportunities: String,
      technologies: [String],
      roles: [String],
    },
  ],
  features: [
    { title: String, description: String },
  ],
  stats: [
    { label: String, value: String },
  ],
  testimonials: [
    { name: String, role: String, quote: String, rating: Number },
  ],
  contact: { phone: String, email: String, address: String },
}, { timestamps: true });

export default mongoose.model("Landing", LandingSchema);
