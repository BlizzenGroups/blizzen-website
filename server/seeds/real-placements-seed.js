import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Placement from '../models/Placement.js';

dotenv.config();

const realPlacementData = [
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
    position: "Data Analyst Intern",
    salary: "₹3.2 LPA",
    testimonial: "The data analytics program gave me strong foundations in Python, SQL, and visualization tools. Freshworks was impressed with my project portfolio.",
    image: "",
    placementDate: new Date('2024-02-10')
  },
  {
    studentName: "Aishwarya M",
    course: "Digital Marketing",
    company: "Chargebee",
    position: "Digital Marketing Executive",
    salary: "₹3.8 LPA",
    testimonial: "The digital marketing course covered everything from SEO to social media strategy. The practical campaigns we ran during training helped me stand out.",
    image: "",
    placementDate: new Date('2024-02-20')
  },
  {
    studentName: "Manoj Kumar",
    course: "Full Stack Development (Python)",
    company: "Aspire Systems",
    position: "Junior Developer",
    salary: "₹4.2 LPA",
    testimonial: "Excellent training program with real-world projects. The mentors were always available to help, and the placement support was outstanding.",
    image: "",
    placementDate: new Date('2024-03-05')
  },
  {
    studentName: "Siva Prakash",
    course: "Web Development",
    company: "Indium Software",
    position: "Web Developer",
    salary: "₹4.0 LPA",
    testimonial: "The web development course was comprehensive, covering both frontend and backend technologies. Great preparation for the industry.",
    image: "",
    placementDate: new Date('2024-03-12')
  },
  {
    studentName: "Nandhini P",
    course: "Digital Marketing",
    company: "GoFrugal Technologies",
    position: "SEO & Content Analyst",
    salary: "₹3.5 LPA",
    testimonial: "The SEO and content marketing modules were particularly strong. I learned practical skills that I use daily in my current role.",
    image: "",
    placementDate: new Date('2024-03-18')
  },
  {
    studentName: "Deepak V",
    course: "Data Analytics",
    company: "TVS Next",
    position: "Business Analyst Trainee",
    salary: "₹3.6 LPA",
    testimonial: "The business analytics focus in the course helped me transition into a business analyst role. The training was industry-relevant and practical.",
    image: "",
    placementDate: new Date('2024-04-02')
  },
  {
    studentName: "Harini L",
    course: "Software Development",
    company: "Ramco Systems",
    position: "Software Engineer Trainee",
    salary: "₹4.1 LPA",
    testimonial: "Great foundation in software development principles. The coding bootcamp style training prepared me well for technical interviews.",
    image: "",
    placementDate: new Date('2024-04-08')
  },
  {
    studentName: "Akash J",
    course: "UI/UX + Web Development",
    company: "DCKAP",
    position: "UI/UX Assistant",
    salary: "₹3.4 LPA",
    testimonial: "The UI/UX design course was hands-on with real client projects. Learning both design and development gave me a competitive edge.",
    image: "",
    placementDate: new Date('2024-04-15')
  },
  {
    studentName: "Keerthana R",
    course: "Full Stack Python",
    company: "Intellect Design Arena",
    position: "Backend Developer Intern",
    salary: "₹3.8 LPA",
    testimonial: "The Python full-stack program was intensive and rewarding. The backend development focus aligned perfectly with my career goals.",
    image: "",
    placementDate: new Date('2024-04-22')
  },
  {
    studentName: "Naveen Raj",
    course: "Data Analytics",
    company: "Prodapt",
    position: "Data Analyst Trainee",
    salary: "₹3.7 LPA",
    testimonial: "Excellent training in data visualization and analytics tools. The real-world datasets we worked with made the learning very practical.",
    image: "",
    placementDate: new Date('2024-05-05')
  },
  {
    studentName: "Swetha K",
    course: "Digital Marketing",
    company: "CavinKare",
    position: "Digital Marketing Coordinator",
    salary: "₹3.6 LPA",
    testimonial: "The digital marketing program covered all aspects from strategy to execution. The internship component was particularly valuable.",
    image: "",
    placementDate: new Date('2024-05-12')
  },
  {
    studentName: "Vishnu S",
    course: "Web Development",
    company: "Contus",
    position: "Front-end Developer",
    salary: "₹4.3 LPA",
    testimonial: "Strong focus on modern web technologies and frameworks. The project-based learning approach helped me build a solid portfolio.",
    image: "",
    placementDate: new Date('2024-05-18')
  },
  {
    studentName: "Dharani A",
    course: "Full Stack Python",
    company: "Zoho Schools of Learning",
    position: "Programmer Trainee",
    salary: "₹4.0 LPA",
    testimonial: "Comprehensive full-stack training with excellent mentorship. The placement preparation sessions were very helpful.",
    image: "",
    placementDate: new Date('2024-05-25')
  },
  {
    studentName: "Sanjay M",
    course: "Digital Marketing",
    company: "WayCool Foods",
    position: "Marketing Associate",
    salary: "₹3.9 LPA",
    testimonial: "Great exposure to digital marketing strategies and tools. The course prepared me well for the fast-paced marketing industry.",
    image: "",
    placementDate: new Date('2024-06-02')
  }
];

async function seedRealPlacements() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✓ Connected to MongoDB');

    // Clear existing placements
    await Placement.deleteMany({});
    console.log('✓ Cleared existing placement data');

    // Insert real placement data
    const result = await Placement.insertMany(realPlacementData);
    console.log(`✓ Seeded ${result.length} real placement records successfully`);

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
    console.error('✗ Error seeding real placements:', error);
    process.exit(1);
  }
}

seedRealPlacements();