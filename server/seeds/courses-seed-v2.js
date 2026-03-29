import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Course from '../models/Course.js';

dotenv.config();

const coursesData = [
  {
    title: "Python Full Stack Development",
    slug: "python-fullstack",
    description: "Master Python and build complete web applications from frontend to backend",
    shortDescription: "Learn Python, Django, React, and databases",
    duration: "6 months",
    level: "Beginner",
    instructor: "Rajesh Kumar",
    price: 25000,
    syllabus: "/syllabi/python-fullstack-syllabus.pdf",
    highlights: [
      "Python fundamentals and advanced concepts",
      "Django framework for backend development",
      "React.js for frontend development",
      "Database design with PostgreSQL",
      "REST API development",
      "Deployment and DevOps basics"
    ],
    curriculum: [
      {
        module: "Python Fundamentals",
        topics: [
          "Variables and data types",
          "Control flow and loops",
          "Functions and modules",
          "Object-oriented programming",
          "Exception handling",
          "File operations"
        ]
      },
      {
        module: "Web Development Basics",
        topics: [
          "HTML5 and CSS3",
          "JavaScript fundamentals",
          "DOM manipulation",
          "Responsive design",
          "Bootstrap framework",
          "Web design principles"
        ]
      },
      {
        module: "Django Backend",
        topics: [
          "Django project setup",
          "Models and ORM",
          "Views and URLs",
          "Templates and forms",
          "Authentication and permissions",
          "Database migrations"
        ]
      },
      {
        module: "React Frontend",
        topics: [
          "React components",
          "JSX and props",
          "State management",
          "Hooks and lifecycle",
          "API integration",
          "Routing with React Router"
        ]
      },
      {
        module: "Databases",
        topics: [
          "SQL basics",
          "Database design",
          "Relationships and joins",
          "Indexing and optimization",
          "MongoDB basics",
          "Data backup and recovery"
        ]
      },
      {
        module: "Deployment",
        topics: [
          "Version control with Git",
          "GitHub and collaboration",
          "Heroku deployment",
          "AWS basics",
          "CI/CD pipelines",
          "Production best practices"
        ]
      }
    ],
    prerequisites: ["Basic programming knowledge", "Computer fundamentals"],
    isActive: true
  },
  {
    title: "Web Development Bootcamp",
    slug: "web-development",
    description: "Complete web development course covering HTML, CSS, JavaScript, and modern frameworks",
    shortDescription: "Frontend and backend web development",
    duration: "5 months",
    level: "Beginner",
    instructor: "Priya Singh",
    price: 20000,
    highlights: [
      "HTML5 and semantic markup",
      "CSS3 and responsive design",
      "JavaScript ES6+",
      "React and Vue.js",
      "Node.js and Express",
      "Real-world projects"
    ],
    curriculum: [
      {
        module: "HTML & CSS Mastery",
        topics: [
          "HTML5 semantic elements",
          "CSS3 properties and animations",
          "Flexbox and CSS Grid",
          "Responsive design",
          "Mobile-first approach",
          "Accessibility standards"
        ]
      },
      {
        module: "JavaScript Fundamentals",
        topics: [
          "Variables and scope",
          "Functions and closures",
          "Async and await",
          "Promises",
          "DOM manipulation",
          "Event handling"
        ]
      },
      {
        module: "React Framework",
        topics: [
          "Components and JSX",
          "Props and state",
          "Hooks",
          "Context API",
          "Redux state management",
          "Testing React apps"
        ]
      },
      {
        module: "Backend Development",
        topics: [
          "Node.js basics",
          "Express.js framework",
          "RESTful APIs",
          "Authentication",
          "Database integration",
          "Error handling"
        ]
      },
      {
        module: "Databases",
        topics: [
          "MongoDB",
          "SQL databases",
          "Data modeling",
          "Query optimization",
          "Transactions",
          "Backup strategies"
        ]
      },
      {
        module: "Deployment & DevOps",
        topics: [
          "Git and GitHub",
          "Docker basics",
          "Deployment platforms",
          "Environment variables",
          "Monitoring and logging",
          "Performance optimization"
        ]
      }
    ],
    prerequisites: ["Basic computer knowledge"],
    isActive: true
  },
  {
    title: "AI & Machine Learning",
    slug: "ai-machine-learning",
    description: "Learn artificial intelligence and machine learning with Python and TensorFlow",
    shortDescription: "AI, ML, Deep Learning, and Neural Networks",
    duration: "6 months",
    level: "Intermediate",
    instructor: "Amit Patel",
    price: 30000,
    highlights: [
      "Machine learning algorithms",
      "Deep learning with TensorFlow",
      "Neural networks",
      "Natural language processing",
      "Computer vision",
      "Real-world AI projects"
    ],
    curriculum: [
      {
        module: "Python for ML",
        topics: [
          "NumPy and Pandas",
          "Data manipulation",
          "Data visualization",
          "Scikit-learn basics",
          "Statistical analysis",
          "Data preprocessing"
        ]
      },
      {
        module: "Machine Learning Basics",
        topics: [
          "Supervised learning",
          "Unsupervised learning",
          "Regression algorithms",
          "Classification algorithms",
          "Clustering",
          "Model evaluation"
        ]
      },
      {
        module: "Deep Learning",
        topics: [
          "Neural networks",
          "Convolutional neural networks",
          "Recurrent neural networks",
          "TensorFlow and Keras",
          "Model optimization",
          "GPU computing"
        ]
      },
      {
        module: "Natural Language Processing",
        topics: [
          "Text preprocessing",
          "Tokenization",
          "Word embeddings",
          "Sentiment analysis",
          "Language models",
          "Transformers"
        ]
      },
      {
        module: "Computer Vision",
        topics: [
          "Image processing",
          "Feature extraction",
          "Object detection",
          "Image classification",
          "Facial recognition",
          "Video analysis"
        ]
      },
      {
        module: "Deployment",
        topics: [
          "Model serialization",
          "API development",
          "Cloud deployment",
          "Model monitoring",
          "A/B testing",
          "Production pipelines"
        ]
      }
    ],
    prerequisites: ["Python programming", "Statistics basics"],
    isActive: true
  },
  {
    title: "Data Science & Analytics",
    slug: "data-science-analytics",
    description: "Master data science, analytics, and business intelligence",
    shortDescription: "Data analysis, visualization, and insights",
    duration: "5 months",
    level: "Intermediate",
    instructor: "Rajesh Kumar",
    price: 28000,
    highlights: [
      "Data analysis with Python",
      "Statistical analysis",
      "Data visualization",
      "Business intelligence",
      "SQL and databases",
      "Real-world datasets"
    ],
    curriculum: [
      {
        module: "Data Fundamentals",
        topics: [
          "Data types and structures",
          "Data collection",
          "Data quality",
          "Data cleaning",
          "Data validation",
          "Data governance"
        ]
      },
      {
        module: "Statistical Analysis",
        topics: [
          "Descriptive statistics",
          "Probability theory",
          "Hypothesis testing",
          "Regression analysis",
          "ANOVA",
          "Statistical inference"
        ]
      },
      {
        module: "Data Visualization",
        topics: [
          "Matplotlib and Seaborn",
          "Plotly interactive charts",
          "Dashboard creation",
          "Tableau basics",
          "Power BI",
          "Storytelling with data"
        ]
      },
      {
        module: "SQL & Databases",
        topics: [
          "SQL queries",
          "Joins and subqueries",
          "Aggregations",
          "Window functions",
          "Database design",
          "Query optimization"
        ]
      },
      {
        module: "Business Analytics",
        topics: [
          "KPI development",
          "Metrics and dashboards",
          "A/B testing",
          "Cohort analysis",
          "Customer analytics",
          "Business intelligence"
        ]
      },
      {
        module: "Advanced Topics",
        topics: [
          "Time series analysis",
          "Forecasting",
          "Predictive analytics",
          "Prescriptive analytics",
          "Big data basics",
          "Cloud analytics"
        ]
      }
    ],
    prerequisites: ["Mathematics basics", "Statistics knowledge"],
    isActive: true
  },
  {
    title: "Cloud Computing & DevOps",
    slug: "cloud-devops",
    description: "Master cloud platforms and DevOps practices for modern application deployment",
    shortDescription: "AWS, Docker, Kubernetes, and CI/CD",
    duration: "4 months",
    level: "Intermediate",
    instructor: "Priya Singh",
    price: 26000,
    highlights: [
      "AWS cloud services",
      "Docker containerization",
      "Kubernetes orchestration",
      "CI/CD pipelines",
      "Infrastructure as code",
      "Monitoring and logging"
    ],
    curriculum: [
      {
        module: "Cloud Fundamentals",
        topics: [
          "Cloud computing concepts",
          "AWS overview",
          "EC2 instances",
          "S3 storage",
          "RDS databases",
          "VPC networking"
        ]
      },
      {
        module: "Docker",
        topics: [
          "Docker basics",
          "Containers vs VMs",
          "Dockerfile creation",
          "Docker images",
          "Docker compose",
          "Registry management"
        ]
      },
      {
        module: "Kubernetes",
        topics: [
          "K8s architecture",
          "Pods and deployments",
          "Services and networking",
          "ConfigMaps and secrets",
          "Persistent volumes",
          "Helm charts"
        ]
      },
      {
        module: "CI/CD Pipelines",
        topics: [
          "Git workflows",
          "Jenkins automation",
          "GitHub Actions",
          "Pipeline design",
          "Testing automation",
          "Deployment strategies"
        ]
      },
      {
        module: "Infrastructure as Code",
        topics: [
          "Terraform basics",
          "CloudFormation",
          "Infrastructure automation",
          "Configuration management",
          "Ansible",
          "Best practices"
        ]
      },
      {
        module: "Monitoring & Logging",
        topics: [
          "Prometheus monitoring",
          "Grafana dashboards",
          "ELK stack",
          "Log aggregation",
          "Alerting",
          "Performance tuning"
        ]
      }
    ],
    prerequisites: ["Linux basics", "Networking knowledge"],
    isActive: true
  },
  {
    title: "Cybersecurity Fundamentals",
    slug: "cybersecurity",
    description: "Learn cybersecurity principles, ethical hacking, and security best practices",
    shortDescription: "Security, hacking, and network protection",
    duration: "5 months",
    level: "Intermediate",
    instructor: "Amit Patel",
    price: 29000,
    highlights: [
      "Network security",
      "Ethical hacking",
      "Penetration testing",
      "Cryptography",
      "Security compliance",
      "Incident response"
    ],
    curriculum: [
      {
        module: "Security Fundamentals",
        topics: [
          "CIA triad",
          "Security threats",
          "Vulnerability assessment",
          "Risk management",
          "Security policies",
          "Compliance frameworks"
        ]
      },
      {
        module: "Network Security",
        topics: [
          "Network protocols",
          "Firewalls",
          "VPNs",
          "Intrusion detection",
          "DDoS protection",
          "Network monitoring"
        ]
      },
      {
        module: "Ethical Hacking",
        topics: [
          "Reconnaissance",
          "Scanning and enumeration",
          "Vulnerability exploitation",
          "Social engineering",
          "Phishing attacks",
          "Penetration testing"
        ]
      },
      {
        module: "Cryptography",
        topics: [
          "Encryption algorithms",
          "Symmetric encryption",
          "Asymmetric encryption",
          "Hashing",
          "Digital signatures",
          "SSL/TLS protocols"
        ]
      },
      {
        module: "Application Security",
        topics: [
          "OWASP top 10",
          "SQL injection",
          "XSS attacks",
          "CSRF protection",
          "Secure coding",
          "Code review"
        ]
      },
      {
        module: "Incident Response",
        topics: [
          "Incident detection",
          "Response procedures",
          "Forensics",
          "Evidence collection",
          "Recovery procedures",
          "Post-incident analysis"
        ]
      }
    ],
    prerequisites: ["Networking basics", "Linux knowledge"],
    isActive: true
  },
  {
    title: "UI/UX Design",
    slug: "ui-ux-design",
    description: "Create beautiful and user-friendly interfaces with modern design principles",
    shortDescription: "Design, prototyping, and user experience",
    duration: "4 months",
    level: "Beginner",
    instructor: "Priya Singh",
    price: 18000,
    highlights: [
      "Design principles",
      "Figma and design tools",
      "Prototyping",
      "User research",
      "Wireframing",
      "Responsive design"
    ],
    curriculum: [
      {
        module: "Design Fundamentals",
        topics: [
          "Design principles",
          "Color theory",
          "Typography",
          "Layout and composition",
          "Visual hierarchy",
          "Design systems"
        ]
      },
      {
        module: "User Research",
        topics: [
          "User personas",
          "User interviews",
          "Surveys and questionnaires",
          "Usability testing",
          "Analytics",
          "User journey mapping"
        ]
      },
      {
        module: "Wireframing & Prototyping",
        topics: [
          "Low-fidelity wireframes",
          "High-fidelity mockups",
          "Interactive prototypes",
          "Figma basics",
          "Adobe XD",
          "Prototyping tools"
        ]
      },
      {
        module: "Figma Mastery",
        topics: [
          "Figma interface",
          "Components and variants",
          "Auto layout",
          "Design tokens",
          "Collaboration",
          "Handoff to developers"
        ]
      },
      {
        module: "Responsive Design",
        topics: [
          "Mobile design",
          "Tablet design",
          "Desktop design",
          "Breakpoints",
          "Adaptive layouts",
          "Touch interactions"
        ]
      },
      {
        module: "UX Writing",
        topics: [
          "Microcopy",
          "Error messages",
          "Button labels",
          "Help text",
          "Tone of voice",
          "Accessibility in writing"
        ]
      }
    ],
    prerequisites: ["Basic design knowledge"],
    isActive: true
  },
  {
    title: "Digital Marketing",
    slug: "digital-marketing",
    description: "Master digital marketing strategies, SEO, social media, and analytics",
    shortDescription: "Marketing, SEO, social media, and analytics",
    duration: "3 months",
    level: "Beginner",
    instructor: "Rajesh Kumar",
    price: 15000,
    highlights: [
      "SEO optimization",
      "Social media marketing",
      "Content marketing",
      "Email marketing",
      "Google Analytics",
      "Paid advertising"
    ],
    curriculum: [
      {
        module: "Digital Marketing Basics",
        topics: [
          "Digital marketing overview",
          "Marketing channels",
          "Customer journey",
          "Marketing funnel",
          "KPIs and metrics",
          "Analytics setup"
        ]
      },
      {
        module: "SEO Fundamentals",
        topics: [
          "On-page SEO",
          "Off-page SEO",
          "Technical SEO",
          "Keyword research",
          "Link building",
          "SEO tools"
        ]
      },
      {
        module: "Social Media Marketing",
        topics: [
          "Facebook marketing",
          "Instagram marketing",
          "LinkedIn marketing",
          "Twitter and TikTok",
          "Content calendar",
          "Community management"
        ]
      },
      {
        module: "Content Marketing",
        topics: [
          "Content strategy",
          "Blog writing",
          "Video content",
          "Infographics",
          "Podcasting",
          "Content distribution"
        ]
      },
      {
        module: "Email Marketing",
        topics: [
          "Email campaigns",
          "Segmentation",
          "Personalization",
          "Automation",
          "A/B testing",
          "Email analytics"
        ]
      },
      {
        module: "Analytics & Optimization",
        topics: [
          "Google Analytics",
          "Conversion tracking",
          "Funnel analysis",
          "A/B testing",
          "Heat mapping",
          "Optimization strategies"
        ]
      }
    ],
    prerequisites: ["Basic marketing knowledge"],
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

    // Display seeded courses
    console.log('\n📚 Seeded Courses:');
    result.forEach(course => {
      console.log(`  - ${course.title} (${course.slug})`);
    });

    await mongoose.connection.close();
    console.log('\n✓ Database connection closed');
  } catch (error) {
    console.error('✗ Error seeding courses:', error);
    process.exit(1);
  }
}

seedCourses();
