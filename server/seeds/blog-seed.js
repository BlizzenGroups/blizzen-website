import mongoose from 'mongoose';
import Blog from '../models/Blog.js';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/blizzen-launchpad';

const blogPosts = [
  {
    title: "Getting Started with Python Full Stack Development",
    slug: "getting-started-python-fullstack",
    excerpt: "Learn the fundamentals of Python full stack development and kickstart your career in web development. Discover the essential tools, frameworks, and best practices.",
    content: `<h2>Introduction to Python Full Stack Development</h2>
<p>Python has become one of the most popular programming languages for web development, thanks to its simplicity and powerful frameworks. In this comprehensive guide, we'll explore what it takes to become a Python full stack developer.</p>

<h3>What is Full Stack Development?</h3>
<p>Full stack development refers to working on both the frontend (what users see) and backend (server-side logic) of web applications. A Python full stack developer uses Python for backend development while utilizing modern frontend technologies.</p>

<h3>Essential Skills</h3>
<ul>
  <li><strong>Backend:</strong> Django, Flask, FastAPI</li>
  <li><strong>Frontend:</strong> HTML, CSS, JavaScript, React</li>
  <li><strong>Database:</strong> PostgreSQL, MongoDB, MySQL</li>
  <li><strong>Version Control:</strong> Git, GitHub</li>
  <li><strong>Deployment:</strong> Docker, AWS, Heroku</li>
</ul>

<h3>Learning Path</h3>
<p>Start with Python basics, then move to a web framework like Django or Flask. Learn database management, API development, and finally frontend technologies. Practice by building real projects and deploy them online.</p>

<h3>Career Opportunities</h3>
<p>Python full stack developers are in high demand with competitive salaries. Companies across industries seek professionals who can handle both frontend and backend development efficiently.</p>`,
    author: "Blizzen Team",
    category: "Technology",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=60",
    tags: ["Python", "Web Development", "Full Stack", "Django", "Career"],
    published: true,
    publishedAt: new Date('2024-10-15')
  },
  {
    title: "Top 10 Skills Every Data Scientist Should Have",
    slug: "top-skills-data-scientist",
    excerpt: "Discover the essential skills and tools that every aspiring data scientist needs to master in 2025. From programming to machine learning, we cover it all.",
    content: `<h2>Essential Data Science Skills</h2>
<p>Data science is one of the most sought-after careers in 2025. Here are the top 10 skills you need to succeed:</p>

<h3>1. Programming Languages</h3>
<p>Master Python and R for data analysis and statistical computing. Python is particularly popular for its extensive libraries.</p>

<h3>2. Statistics and Mathematics</h3>
<p>Understanding statistical concepts, probability, and linear algebra is fundamental for data analysis and modeling.</p>

<h3>3. Machine Learning</h3>
<p>Learn supervised and unsupervised learning algorithms, neural networks, and deep learning frameworks like TensorFlow and PyTorch.</p>

<h3>4. Data Visualization</h3>
<p>Master tools like Matplotlib, Seaborn, Tableau, and Power BI to present insights effectively.</p>

<h3>5. SQL and Database Management</h3>
<p>Query databases efficiently and understand data warehousing concepts.</p>

<h3>6. Big Data Technologies</h3>
<p>Familiarity with Hadoop, Spark, and cloud platforms like AWS or Azure.</p>

<h3>7. Business Acumen</h3>
<p>Understand business problems and translate them into data science solutions.</p>

<h3>8. Communication Skills</h3>
<p>Explain complex findings to non-technical stakeholders clearly.</p>

<h3>9. Domain Knowledge</h3>
<p>Specialize in industries like finance, healthcare, or e-commerce.</p>

<h3>10. Ethics and Privacy</h3>
<p>Understand data privacy laws and ethical considerations in AI.</p>`,
    author: "Blizzen Team",
    category: "Career",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=60",
    tags: ["Data Science", "Career", "Skills", "Machine Learning"],
    published: true,
    publishedAt: new Date('2024-10-20')
  },
  {
    title: "The Future of AI and Machine Learning in 2025",
    slug: "future-ai-ml-2025",
    excerpt: "Explore the latest trends and predictions for artificial intelligence and machine learning. See how AI is transforming industries worldwide.",
    content: `<h2>AI and ML: The Future is Now</h2>
<p>As we move through 2025, artificial intelligence and machine learning continue to reshape our world in unprecedented ways.</p>

<h3>Key Trends in 2025</h3>
<p><strong>Generative AI:</strong> Tools like ChatGPT and Midjourney have become mainstream, revolutionizing content creation and automation.</p>

<p><strong>Edge AI:</strong> Processing data on devices rather than cloud servers for faster, more private AI applications.</p>

<p><strong>AI in Healthcare:</strong> Predictive diagnostics, personalized medicine, and drug discovery powered by AI.</p>

<h3>Industry Applications</h3>
<ul>
  <li><strong>Finance:</strong> Fraud detection, algorithmic trading, risk assessment</li>
  <li><strong>Retail:</strong> Personalized recommendations, inventory management</li>
  <li><strong>Manufacturing:</strong> Predictive maintenance, quality control</li>
  <li><strong>Education:</strong> Adaptive learning, automated grading</li>
</ul>

<h3>Challenges and Ethics</h3>
<p>As AI becomes more powerful, addressing bias, privacy concerns, and job displacement becomes crucial. Responsible AI development is more important than ever.</p>

<h3>Career Opportunities</h3>
<p>The demand for AI/ML engineers, data scientists, and AI ethicists continues to grow. Now is the perfect time to enter this exciting field.</p>`,
    author: "Blizzen Team",
    category: "Technology",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&auto=format&fit=crop&q=60",
    tags: ["AI", "Machine Learning", "Future Tech", "Innovation"],
    published: true,
    publishedAt: new Date('2024-10-25')
  },
  {
    title: "How to Build a Portfolio That Gets You Hired",
    slug: "build-portfolio-get-hired",
    excerpt: "Learn how to create a compelling portfolio that showcases your skills and attracts potential employers. Stand out from the competition with these proven strategies.",
    content: `<h2>Creating a Winning Portfolio</h2>
<p>Your portfolio is your ticket to landing your dream job in tech. Here's how to make it stand out.</p>

<h3>Essential Elements</h3>
<p><strong>About Section:</strong> Tell your story, highlight your skills, and show your personality.</p>

<p><strong>Projects:</strong> Showcase 4-6 quality projects that demonstrate different skills. Include live demos and GitHub links.</p>

<p><strong>Technical Skills:</strong> List technologies you're proficient in with visual indicators of skill level.</p>

<h3>Best Practices</h3>
<ul>
  <li>Focus on quality over quantity</li>
  <li>Include detailed project descriptions</li>
  <li>Show your problem-solving process</li>
  <li>Make it mobile-responsive</li>
  <li>Keep it updated regularly</li>
</ul>

<h3>Portfolio Tips</h3>
<p>Use a custom domain, ensure fast loading times, and make sure your contact information is easily accessible. Include testimonials if possible.</p>`,
    author: "Blizzen Team",
    category: "Career",
    image: "https://images.unsplash.com/photo-1487017159836-4e23ece2e4cf?w=800&auto=format&fit=crop&q=60",
    tags: ["Career", "Portfolio", "Job Search", "Tips"],
    published: true,
    publishedAt: new Date('2024-11-01')
  }
];

async function seedBlogs() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✓ Connected to MongoDB');

    await Blog.deleteMany({});
    console.log('✓ Cleared existing blog posts');

    const createdBlogs = await Blog.insertMany(blogPosts);
    console.log(`✓ Created ${createdBlogs.length} blog posts`);

    console.log('\n📝 Blog Posts:');
    createdBlogs.forEach(blog => {
      console.log(`  - ${blog.title} (${blog.category})`);
      console.log(`    Slug: ${blog.slug}`);
      console.log(`    Published: ${blog.published ? 'Yes' : 'No'}`);
    });

    process.exit(0);
  } catch (error) {
    console.error('✗ Seed error:', error);
    process.exit(1);
  }
}

seedBlogs();
