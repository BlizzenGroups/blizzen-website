import express from 'express';
import FooterContent from '../models/FooterContent.js';
import Course from '../models/Course.js';

const router = express.Router();

// Helper function to sanitize string input (prevent XSS)
const sanitizeString = (str) => {
  if (typeof str !== 'string') return '';
  return str
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;')
    .trim();
};

// Get footer content
router.get('/', async (req, res) => {
  try {
    let footerContent = await FooterContent.findOne();
    
    // If no footer content exists, create default
    if (!footerContent) {
      footerContent = new FooterContent({
        description: "Blizzen Creations is a premier IT training and placement institute dedicated to empowering students with cutting-edge skills and real-world experience.",
        socialLinks: [
          { name: 'Facebook', url: 'https://facebook.com/blizzencreations', icon: 'Facebook', isActive: true },
          { name: 'Instagram', url: 'https://instagram.com/blizzencreations', icon: 'Instagram', isActive: true },
          { name: 'LinkedIn', url: 'https://linkedin.com/company/blizzencreations', icon: 'Linkedin', isActive: true },
          { name: 'YouTube', url: 'https://youtube.com/@blizzencreations', icon: 'Youtube', isActive: true }
        ],
        quickLinks: [
          { label: 'About Us', path: '/about', isActive: true },
          { label: 'Courses', path: '/courses', isActive: true },
          { label: 'Placements', path: '/placements', isActive: true },
          { label: 'Contact', path: '/contact', isActive: true }
        ],
        popularCourses: [],
        showSocialLinks: true,
        showQuickLinks: true,
        showPopularCourses: true,
        copyright: "© 2024 Blizzen Creations. All rights reserved."
      });
      await footerContent.save();
    }
    
    res.json(footerContent);
  } catch (error) {
    console.error('Error fetching footer content:', error);
    res.status(500).json({ message: 'Error fetching footer content', error: error.message });
  }
});

// Update footer content
router.post('/', async (req, res) => {
  try {
    const footerData = req.body;
    
    // Validate data
    if (!footerData.description || footerData.description.trim() === '') {
      return res.status(400).json({ message: 'Description is required' });
    }
    
    // Validate social links
    if (footerData.socialLinks) {
      for (const link of footerData.socialLinks) {
        if (!link.name || !link.url || !link.icon) {
          return res.status(400).json({ message: 'All social links must have name, url, and icon' });
        }
      }
    }
    
    // Validate quick links
    if (footerData.quickLinks) {
      for (const link of footerData.quickLinks) {
        if (!link.label || !link.path) {
          return res.status(400).json({ message: 'All quick links must have label and path' });
        }
      }
    }
    
    // Validate and sanitize popular courses
    if (footerData.popularCourses && Array.isArray(footerData.popularCourses)) {
      // Extract all course IDs for batch validation (avoids N+1 query problem)
      const courseIds = footerData.popularCourses
        .map(course => course.courseId)
        .filter(id => id); // Filter out null/undefined
      
      if (courseIds.length !== footerData.popularCourses.length) {
        return res.status(400).json({ message: 'Each popular course must have a courseId' });
      }
      
      // Fetch all courses in a single query
      const existingCourses = await Course.find({ _id: { $in: courseIds } });
      const courseMap = new Map(existingCourses.map(c => [c._id.toString(), c]));
      
      // Validate all course IDs exist
      const missingIds = courseIds.filter(id => !courseMap.has(id.toString()));
      if (missingIds.length > 0) {
        return res.status(400).json({ message: `Course(s) with ID(s) ${missingIds.join(', ')} do not exist` });
      }
      
      // Sanitize and build validated courses array
      const validatedCourses = footerData.popularCourses.map(course => {
        const existingCourse = courseMap.get(course.courseId.toString());
        return {
          courseId: course.courseId,
          title: sanitizeString(course.title || existingCourse.title),
          slug: sanitizeString(course.slug || existingCourse.slug)
        };
      });
      
      footerData.popularCourses = validatedCourses;
    }
    
    // Update or create footer content using findOneAndUpdate to avoid version conflicts
    const footerContent = await FooterContent.findOneAndUpdate(
      {},
      { 
        $set: {
          ...footerData,
          updatedAt: new Date()
        }
      },
      { 
        new: true, 
        upsert: true,
        runValidators: true
      }
    );
    
    res.json({ message: 'Footer content updated successfully', data: footerContent });
  } catch (error) {
    console.error('Error updating footer content:', error);
    res.status(500).json({ message: 'Error updating footer content', error: error.message });
  }
});

export default router;
