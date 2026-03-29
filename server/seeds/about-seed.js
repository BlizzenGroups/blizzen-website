import mongoose from 'mongoose';
import dotenv from 'dotenv';
import About from '../models/About.js';

dotenv.config();

const aboutData = {
  title: "About Blizzen Creations",
  heroImage: "",
  heroDescription: "Blizzen Creations is a leading IT training institute dedicated to transforming careers and launching tech professionals into the industry.",
  excellenceTitle: "Empowering IT Careers Through Excellence",
  excellenceParagraph1: "Blizzen Creations is a premier IT training and placement institute dedicated to transforming aspiring professionals into industry-ready experts. We combine theoretical knowledge with practical, hands-on experience to ensure our students are fully prepared for the demands of the modern tech industry.",
  excellenceParagraph2: "Our comprehensive programs cover the latest technologies and industry best practices, taught by experienced professionals who bring real-world insights into the classroom. With a focus on project-based learning and personalized mentorship, we've successfully launched thousands of careers in IT.",
  missionTitle: "Our Mission",
  missionDescription: "To provide industry-relevant, hands-on IT training that empowers individuals to launch successful careers in technology. We believe in practical learning, expert mentorship, and 100% job placement support.",
  visionTitle: "Our Vision",
  visionDescription: "To become the most trusted IT training institute in India, known for producing job-ready professionals who drive innovation and excellence in the tech industry.",
  valuesTitle: "Our Core Values",
  values: [
    {
      title: "Quality Education",
      description: "We deliver comprehensive, industry-standard curriculum with hands-on projects and real-world scenarios.",
      icon: "BookOpen"
    },
    {
      title: "Expert Mentorship",
      description: "Learn from industry professionals with years of experience in their respective fields.",
      icon: "Users"
    },
    {
      title: "Career Support",
      description: "100% placement assistance with interview preparation, resume building, and job placement support.",
      icon: "Briefcase"
    },
    {
      title: "Innovation",
      description: "We constantly update our curriculum to match the latest industry trends and technologies.",
      icon: "Lightbulb"
    }
  ],
  team: [
    {
      name: "Rajesh Kumar",
      position: "Founder & CEO",
      bio: "20+ years in IT industry with expertise in full-stack development and team leadership.",
      image: ""
    },
    {
      name: "Priya Singh",
      position: "Director of Academics",
      bio: "15+ years in education and curriculum development with focus on practical learning.",
      image: ""
    },
    {
      name: "Amit Patel",
      position: "Head of Placements",
      bio: "10+ years in recruitment and placement with 95%+ placement success rate.",
      image: ""
    }
  ],
  achievements: [
    { label: "Students Trained", value: "5000+" },
    { label: "Placement Rate", value: "95%" },
    { label: "Years of Experience", value: "10+" },
    { label: "Industry Partners", value: "50+" }
  ],
  whyChooseUs: {
    sectionTitle: "Why Choose Blizzen Creations?",
    sectionSubtitle: "What sets us apart from the rest",
    features: [
      {
        title: "Industry-Aligned Curriculum",
        description: "Our courses are constantly updated to reflect the latest industry trends and requirements, ensuring you learn what employers are looking for."
      },
      {
        title: "Experienced Faculty",
        description: "Learn from industry experts with years of hands-on experience who bring real-world projects and case studies into the classroom."
      },
      {
        title: "Dedicated Placement Support",
        description: "Our placement team works tirelessly to connect you with top companies, providing interview preparation, resume building, and career guidance."
      }
    ]
  }
};

async function seedAbout() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✓ Connected to MongoDB');

    await About.deleteMany({});
    console.log('✓ Cleared existing about content');

    const result = await About.create(aboutData);
    console.log('✓ Seeded about page content successfully');

    await mongoose.connection.close();
    console.log('✓ Database connection closed');
  } catch (error) {
    console.error('✗ Error seeding about content:', error);
    process.exit(1);
  }
}

seedAbout();
