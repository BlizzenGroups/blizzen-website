import mongoose from 'mongoose';
import dotenv from 'dotenv';
import HomeContent from '../models/HomeContent.js';

dotenv.config();

const homeData = {
  heroTitle: "Launch Your IT Career",
  heroDescription: "Industry-leading programs designed to transform you into a job-ready tech professional with hands-on projects and expert mentorship",
  heroImage: "",
  featuredCourses: ["python-fullstack", "web-development", "ai-machine-learning"],
  testimonials: [
    {
      name: "Rajesh Kumar",
      role: "Software Developer at TCS",
      message: "The course was comprehensive and industry-relevant. Great mentorship and job support! I got placed within 2 weeks of completing the course.",
      image: ""
    },
    {
      name: "Priya Singh",
      role: "Frontend Developer at Infosys",
      message: "Excellent hands-on projects and placement assistance. The instructors are very supportive and always available to help.",
      image: ""
    },
    {
      name: "Amit Patel",
      role: "ML Engineer at Google",
      message: "Best decision ever! The AI/ML course prepared me perfectly for Google interviews. Highly recommended!",
      image: ""
    }
  ],
  stats: [
    { label: "Students Trained", value: "5000+" },
    { label: "Placement Rate", value: "95%" },
    { label: "Years of Experience", value: "10+" },
    { label: "Industry Partners", value: "50+" }
  ],
  callToAction: {
    title: "Ready to Transform Your Career?",
    description: "Join thousands of successful students and launch your tech career today with our industry-leading programs",
    buttonText: "Explore Courses"
  }
};

async function seedHome() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✓ Connected to MongoDB');

    await HomeContent.deleteMany({});
    console.log('✓ Cleared existing home content');

    const result = await HomeContent.create(homeData);
    console.log('✓ Seeded home page content successfully');

    await mongoose.connection.close();
    console.log('✓ Database connection closed');
  } catch (error) {
    console.error('✗ Error seeding home content:', error);
    process.exit(1);
  }
}

seedHome();
