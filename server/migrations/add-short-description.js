import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Course from '../models/Course.js';

dotenv.config();

// Default short descriptions based on course title patterns
const defaultShortDescriptions = {
  'python': 'Learn Python, Django, React, and databases',
  'web development': 'Frontend and backend web development',
  'ai': 'AI, ML, Deep Learning, and Neural Networks',
  'machine learning': 'AI, ML, Deep Learning, and Neural Networks',
  'data science': 'Data analysis, visualization, and insights',
  'cloud': 'AWS, Docker, Kubernetes, and CI/CD',
  'devops': 'AWS, Docker, Kubernetes, and CI/CD',
  'cybersecurity': 'Security, hacking, and network protection',
  'ui/ux': 'Design, prototyping, and user experience',
  'design': 'Design, prototyping, and user experience',
  'digital marketing': 'Marketing, SEO, social media, and analytics',
  'marketing': 'Marketing, SEO, social media, and analytics'
};

function getShortDescription(title, description) {
  const titleLower = title.toLowerCase();
  
  // Try to find a matching pattern
  for (const [key, value] of Object.entries(defaultShortDescriptions)) {
    if (titleLower.includes(key)) {
      return value;
    }
  }
  
  // If no match, create from description (first 50 characters)
  return description ? description.substring(0, 50) + '...' : 'Comprehensive course';
}

async function addShortDescriptions() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✓ Connected to MongoDB');

    // Find all courses without shortDescription
    const coursesWithoutShortDesc = await Course.find({
      $or: [
        { shortDescription: { $exists: false } },
        { shortDescription: null },
        { shortDescription: '' }
      ]
    });

    console.log(`\n📚 Found ${coursesWithoutShortDesc.length} courses without shortDescription`);

    if (coursesWithoutShortDesc.length === 0) {
      console.log('✓ All courses already have shortDescription!');
      await mongoose.connection.close();
      return;
    }

    // Update each course
    for (const course of coursesWithoutShortDesc) {
      const shortDescription = getShortDescription(course.title, course.description);
      course.shortDescription = shortDescription;
      await course.save();
      console.log(`  ✓ Updated: ${course.title} -> "${shortDescription}"`);
    }

    console.log(`\n✓ Successfully updated ${coursesWithoutShortDesc.length} courses`);

    await mongoose.connection.close();
    console.log('✓ Database connection closed');
  } catch (error) {
    console.error('✗ Error updating courses:', error);
    process.exit(1);
  }
}

addShortDescriptions();
