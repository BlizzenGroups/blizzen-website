import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Placement from '../models/Placement.js';

dotenv.config();

const placementsData = [
  {
    studentName: "Rajesh Kumar",
    course: "Python Full Stack Development",
    company: "TCS",
    position: "Software Developer",
    salary: "₹6,00,000 - ₹8,00,000 LPA",
    testimonial: "The course was comprehensive and industry-relevant. Great mentorship and job support!",
    placementDate: new Date("2024-06-15"),
    isActive: true
  },
  {
    
    studentName: "Priya Singh",
    course: "Web Development",
    company: "Infosys",
    position: "Frontend Developer",
    salary: "₹5,50,000 - ₹7,50,000 LPA",
    testimonial: "Excellent hands-on projects and placement assistance. Highly recommended!",
    placementDate: new Date("2024-07-20"),
    isActive: true
  },
  {
    studentName: "Amit Patel",
    course: "AI & Machine Learning",
    company: "Google",
    position: "ML Engineer",
    salary: "₹12,00,000 - ₹15,00,000 LPA",
    testimonial: "Best decision ever! The AI/ML course prepared me perfectly for Google.",
    placementDate: new Date("2024-05-10"),
    isActive: true
  },
  {
    studentName: "Neha Gupta",
    course: "Data Science & Analytics",
    company: "Amazon",
    position: "Data Analyst",
    salary: "₹8,00,000 - ₹10,00,000 LPA",
    testimonial: "Amazing learning experience with real-world projects and expert guidance.",
    placementDate: new Date("2024-08-05"),
    isActive: true
  },
  {
    studentName: "Vikram Sharma",
    course: "Cloud Computing & DevOps",
    company: "Microsoft",
    position: "DevOps Engineer",
    salary: "₹10,00,000 - ₹13,00,000 LPA",
    testimonial: "The DevOps course was incredibly practical. Got placed in Microsoft!",
    placementDate: new Date("2024-06-30"),
    isActive: true
  },
  {
    studentName: "Anjali Verma",
    course: "Cybersecurity",
    company: "Cisco",
    position: "Security Analyst",
    salary: "₹7,50,000 - ₹9,50,000 LPA",
    testimonial: "Comprehensive cybersecurity training with industry experts. Highly satisfied!",
    placementDate: new Date("2024-07-15"),
    isActive: true
  },
  {
    studentName: "Rohan Desai",
    course: "UI/UX Design",
    company: "Adobe",
    position: "UX Designer",
    salary: "₹6,50,000 - ₹8,50,000 LPA",
    testimonial: "Great design course with portfolio building. Adobe was my dream company!",
    placementDate: new Date("2024-08-20"),
    isActive: true
  },
  {
    studentName: "Sneha Nair",
    course: "Digital Marketing",
    company: "HubSpot",
    position: "Digital Marketing Specialist",
    salary: "₹5,00,000 - ₹7,00,000 LPA",
    testimonial: "Excellent digital marketing course with real campaign experience.",
    placementDate: new Date("2024-09-01"),
    isActive: true
  }
];

async function seedPlacements() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✓ Connected to MongoDB');

    await Placement.deleteMany({});
    console.log('✓ Cleared existing placements');

    const result = await Placement.insertMany(placementsData);
    console.log(`✓ Seeded ${result.length} placements successfully`);

    await mongoose.connection.close();
    console.log('✓ Database connection closed');
  } catch (error) {
    console.error('✗ Error seeding placements:', error);
    process.exit(1);
  }
}

seedPlacements();
