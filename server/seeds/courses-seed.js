import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Course from '../models/Course.js';

dotenv.config();

const coursesData = [
  {
    title: "Python Full Stack Development",
    slug: "python-fullstack",
    shortDescription: "Master full-stack development with Python, Django, React, databases, and cloud deployment.",
    description: "Master full-stack development with Python, Django, React, databases, and cloud deployment. Build real-world applications from scratch.",
    duration: "6 Months",
    level: "Advanced",
    instructor: "Expert Mentors",
    price: 0,
    highlights: [
      "Python Programming",
      "Front-End (React)",
      "Back-End (Django)",
      "Databases",
      "Deployment"
    ],
    curriculum: [
      {
        module: "Python Programming",
        topics: ["Basics", "OOP", "Advanced Concepts"]
      },
      {
        module: "Front-End (React)",
        topics: ["Components", "State Management", "Hooks"]
      },
      {
        module: "Back-End (Django)",
        topics: ["Models", "Views", "URLs", "Authentication"]
      },
      {
        module: "Databases",
        topics: ["SQL", "NoSQL", "Optimization"]
      },
      {
        module: "Deployment",
        topics: ["Docker", "AWS", "CI/CD"]
      }
    ],
    prerequisites: ["Basic programming knowledge"],
    isActive: true
  },
  {
    title: "Web Development",
    slug: "web-development",
    shortDescription: "Learn HTML, CSS, JavaScript, React, Node.js, and build responsive, modern websites and web applications.",
    description: "Learn HTML, CSS, JavaScript, React, Node.js, and build responsive, modern websites and web applications.",
    duration: "5 Months",
    level: "Beginner",
    instructor: "Expert Mentors",
    price: 0,
    highlights: [
      "HTML/CSS",
      "JavaScript",
      "React",
      "Node.js",
      "MongoDB"
    ],
    curriculum: [
      {
        module: "HTML/CSS",
        topics: ["Semantic HTML", "CSS Flexbox", "CSS Grid", "Responsive Design"]
      },
      {
        module: "JavaScript",
        topics: ["ES6+", "DOM Manipulation", "Async Programming"]
      },
      {
        module: "React",
        topics: ["Components", "Hooks", "State Management"]
      },
      {
        module: "Node.js",
        topics: ["Express", "REST APIs", "Middleware"]
      },
      {
        module: "MongoDB",
        topics: ["Collections", "Queries", "Aggregation"]
      }
    ],
    prerequisites: ["None"],
    isActive: true
  },
  {
    title: "Artificial Intelligence & Machine Learning",
    slug: "ai-machine-learning",
    shortDescription: "Deep dive into AI/ML algorithms, neural networks, deep learning, and practical AI applications.",
    description: "Deep dive into AI/ML algorithms, neural networks, deep learning, and practical AI applications.",
    duration: "5 Months",
    level: "Intermediate",
    instructor: "Expert Mentors",
    price: 0,
    highlights: [
      "Python for ML",
      "Machine Learning",
      "Deep Learning",
      "Neural Networks",
      "AI Projects"
    ],
    curriculum: [
      {
        module: "Python for ML",
        topics: ["NumPy", "Pandas", "Scikit-learn"]
      },
      {
        module: "Machine Learning",
        topics: ["Supervised Learning", "Unsupervised Learning", "Model Evaluation"]
      },
      {
        module: "Deep Learning",
        topics: ["Neural Networks", "TensorFlow", "Keras"]
      },
      {
        module: "Neural Networks",
        topics: ["CNN", "RNN", "Transformers"]
      },
      {
        module: "AI Projects",
        topics: ["Real-world Applications", "Deployment"]
      }
    ],
    prerequisites: ["Python knowledge", "Statistics basics"],
    isActive: true
  },
  {
    title: "Data Science & Analytics",
    slug: "data-science-analytics",
    shortDescription: "Learn data analysis, visualization, statistics, predictive modeling, and big data technologies.",
    description: "Learn data analysis, visualization, statistics, predictive modeling, and big data technologies.",
    duration: "5 Months",
    level: "Advanced",
    instructor: "Expert Mentors",
    price: 0,
    highlights: [
      "Python/R",
      "Data Analysis",
      "Visualization",
      "Statistics",
      "Big Data"
    ],
    curriculum: [
      {
        module: "Python/R",
        topics: ["Data Manipulation", "Analysis Tools"]
      },
      {
        module: "Data Analysis",
        topics: ["Exploratory Analysis", "Data Cleaning"]
      },
      {
        module: "Visualization",
        topics: ["Matplotlib", "Seaborn", "Tableau"]
      },
      {
        module: "Statistics",
        topics: ["Probability", "Hypothesis Testing", "Regression"]
      },
      {
        module: "Big Data",
        topics: ["Spark", "Hadoop", "Data Warehousing"]
      }
    ],
    prerequisites: ["Python knowledge", "Statistics basics"],
    isActive: true
  },
  {
    title: "Digital Marketing",
    slug: "digital-marketing",
    shortDescription: "Master SEO, social media marketing, Google Ads, content marketing, and analytics for digital success.",
    description: "Master SEO, social media marketing, Google Ads, content marketing, and analytics for digital success.",
    duration: "3 Months",
    level: "Beginner",
    instructor: "Expert Mentors",
    price: 0,
    highlights: [
      "SEO",
      "Social Media",
      "Google Ads",
      "Content Marketing",
      "Analytics"
    ],
    curriculum: [
      {
        module: "SEO",
        topics: ["On-page SEO", "Off-page SEO", "Technical SEO"]
      },
      {
        module: "Social Media",
        topics: ["Strategy", "Content Creation", "Community Management"]
      },
      {
        module: "Google Ads",
        topics: ["Search Ads", "Display Ads", "Campaign Management"]
      },
      {
        module: "Content Marketing",
        topics: ["Blog Writing", "Video Marketing", "Email Marketing"]
      },
      {
        module: "Analytics",
        topics: ["Google Analytics", "Data Interpretation", "ROI Tracking"]
      }
    ],
    prerequisites: ["None"],
    isActive: true
  },
  {
    title: "Cloud Computing & DevOps",
    slug: "cloud-devops",
    shortDescription: "Master AWS, Azure, Docker, Kubernetes, CI/CD pipelines, and cloud architecture best practices.",
    description: "Master AWS, Azure, Docker, Kubernetes, CI/CD pipelines, and cloud architecture best practices.",
    duration: "4 Months",
    level: "Intermediate",
    instructor: "Expert Mentors",
    price: 0,
    highlights: [
      "AWS/Azure",
      "Docker",
      "Kubernetes",
      "CI/CD",
      "Cloud Architecture"
    ],
    curriculum: [
      {
        module: "AWS/Azure",
        topics: ["EC2", "S3", "VPC", "Azure Services"]
      },
      {
        module: "Docker",
        topics: ["Containerization", "Docker Compose", "Registry"]
      },
      {
        module: "Kubernetes",
        topics: ["Pods", "Services", "Deployments", "Scaling"]
      },
      {
        module: "CI/CD",
        topics: ["Jenkins", "GitLab CI", "GitHub Actions"]
      },
      {
        module: "Cloud Architecture",
        topics: ["Microservices", "Scalability", "Security"]
      }
    ],
    prerequisites: ["Linux basics", "Networking knowledge"],
    isActive: true
  },
  {
    title: "Cybersecurity",
    slug: "cybersecurity",
    shortDescription: "Learn ethical hacking, network security, penetration testing, and cybersecurity best practices.",
    description: "Learn ethical hacking, network security, penetration testing, and cybersecurity best practices.",
    duration: "4 Months",
    level: "Intermediate",
    instructor: "Expert Mentors",
    price: 0,
    highlights: [
      "Network Security",
      "Ethical Hacking",
      "Penetration Testing",
      "Security Tools",
      "Compliance"
    ],
    curriculum: [
      {
        module: "Network Security",
        topics: ["Firewalls", "VPN", "Intrusion Detection"]
      },
      {
        module: "Ethical Hacking",
        topics: ["Reconnaissance", "Scanning", "Exploitation"]
      },
      {
        module: "Penetration Testing",
        topics: ["Methodology", "Tools", "Reporting"]
      },
      {
        module: "Security Tools",
        topics: ["Metasploit", "Wireshark", "Burp Suite"]
      },
      {
        module: "Compliance",
        topics: ["GDPR", "ISO 27001", "Security Standards"]
      }
    ],
    prerequisites: ["Networking basics", "Linux knowledge"],
    isActive: true
  },
  {
    title: "UI/UX Design",
    slug: "ui-ux-design",
    shortDescription: "Master user interface and user experience design, prototyping, design thinking, and industry tools.",
    description: "Master user interface and user experience design, prototyping, design thinking, and industry tools.",
    duration: "4 Months",
    level: "Beginner",
    instructor: "Expert Mentors",
    price: 0,
    highlights: [
      "Design Principles",
      "Figma/Adobe XD",
      "User Research",
      "Prototyping",
      "Design Systems"
    ],
    curriculum: [
      {
        module: "Design Principles",
        topics: ["Color Theory", "Typography", "Layout"]
      },
      {
        module: "Figma/Adobe XD",
        topics: ["Interface Design", "Prototyping", "Collaboration"]
      },
      {
        module: "User Research",
        topics: ["User Interviews", "Personas", "User Testing"]
      },
      {
        module: "Prototyping",
        topics: ["Wireframing", "High-fidelity Prototypes", "Interaction Design"]
      },
      {
        module: "Design Systems",
        topics: ["Component Libraries", "Design Tokens", "Documentation"]
      }
    ],
    prerequisites: ["None"],
    isActive: true
  }
];

async function seedCourses() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✓ Connected to MongoDB');

    // Clear existing courses
    await Course.deleteMany({});
    console.log('✓ Cleared existing courses');

    // Insert new courses
    const result = await Course.insertMany(coursesData);
    console.log(`✓ Seeded ${result.length} courses successfully`);

    await mongoose.connection.close();
    console.log('✓ Database connection closed');
  } catch (error) {
    console.error('✗ Error seeding courses:', error);
    process.exit(1);
  }
}

seedCourses();
