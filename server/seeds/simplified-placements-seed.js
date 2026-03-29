import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Placement from '../models/Placement.js';

dotenv.config();

const simplifiedPlacementData = [
  {
    studentName: "Priya S",
    course: "Full Stack Development (Python)",
    company: "Zoho Corporation",
    position: "Software Developer"
  },
  {
    studentName: "Karthik R",
    course: "Data Analytics",
    company: "Freshworks",
    position: "Data Analyst Intern"
  },
  {
    studentName: "Aishwarya M",
    course: "Digital Marketing",
    company: "Chargebee",
    position: "Digital Marketing Executive"
  },
  {
    studentName: "Manoj Kumar",
    course: "Full Stack Development (Python)",
    company: "Aspire Systems",
    position: "Junior Developer"
  },
  {
    studentName: "Siva Prakash",
    course: "Web Development",
    company: "Indium Software",
    position: "Web Developer"
  },
  {
    studentName: "Nandhini P",
    course: "Digital Marketing",
    company: "GoFrugal Technologies",
    position: "SEO & Content Analyst"
  },
  {
    studentName: "Deepak V",
    course: "Data Analytics",
    company: "TVS Next",
    position: "Business Analyst Trainee"
  },
  {
    studentName: "Harini L",
    course: "Software Development",
    company: "Ramco Systems",
    position: "Software Engineer Trainee"
  },
  {
    studentName: "Akash J",
    course: "UI/UX + Web Development",
    company: "DCKAP",
    position: "UI/UX Assistant"
  },
  {
    studentName: "Keerthana R",
    course: "Full Stack Python",
    company: "Intellect Design Arena",
    position: "Backend Developer Intern"
  },
  {
    studentName: "Naveen Raj",
    course: "Data Analytics",
    company: "Prodapt",
    position: "Data Analyst Trainee"
  },
  {
    studentName: "Swetha K",
    course: "Digital Marketing",
    company: "CavinKare",
    position: "Digital Marketing Coordinator"
  },
  {
    studentName: "Vishnu S",
    course: "Web Development",
    company: "Contus",
    position: "Front-end Developer"
  },
  {
    studentName: "Dharani A",
    course: "Full Stack Python",
    company: "Zoho Schools of Learning",
    position: "Programmer Trainee"
  },
  {
    studentName: "Sanjay M",
    course: "Digital Marketing",
    company: "WayCool Foods",
    position: "Marketing Associate"
  }
];

async function seedSimplifiedPlacements() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✓ Connected to MongoDB');

    // Clear existing placements
    await Placement.deleteMany({});
    console.log('✓ Cleared existing placement data');

    // Insert simplified placement data
    const result = await Placement.insertMany(simplifiedPlacementData);
    console.log(`✓ Seeded ${result.length} simplified placement records successfully`);

    // Display summary
    console.log('\n📊 Placement Summary:');
    console.log(`Total Students: ${result.length}`);
    
    const companyCounts = {};
    const courseCounts = {};
    
    result.forEach(placement => {
      companyCounts[placement.company] = (companyCounts[placement.company] || 0) + 1;
      courseCounts[placement.course] = (courseCounts[placement.course] || 0) + 1;
    });

    console.log('\n🏢 Companies:');
    Object.entries(companyCounts).forEach(([company, count]) => {
      console.log(`   ${company}: ${count} student${count > 1 ? 's' : ''}`);
    });

    console.log('\n📚 Courses:');
    Object.entries(courseCounts).forEach(([course, count]) => {
      console.log(`   ${course}: ${count} student${count > 1 ? 's' : ''}`);
    });

    await mongoose.connection.close();
    console.log('\n✓ Database connection closed');
  } catch (error) {
    console.error('✗ Error seeding simplified placements:', error);
    process.exit(1);
  }
}

seedSimplifiedPlacements();