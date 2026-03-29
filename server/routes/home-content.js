import express from 'express';
import HomeContent from '../models/HomeContent.js';

const router = express.Router();

// GET /api/home-content - Fetch home content
router.get('/', async (req, res) => {
  try {
    let homeContent = await HomeContent.findOne();
    
    // If no content exists, create default content
    if (!homeContent) {
      homeContent = new HomeContent({
        heroTitle: "Transform Your Career with Expert IT Training",
        heroDescription: "Join thousands of successful students who have launched their tech careers with our comprehensive training programs and guaranteed placement support.",
        heroImage: "",
        featuredCourses: [],
        stats: [
          { label: "Students Trained", value: "2000+" },
          { label: "Placement Rate", value: "95%" },
          { label: "Average Salary", value: "₹5 LPA" },
          { label: "Partner Companies", value: "100+" }
        ],
        testimonials: [
          {
            name: "Priya Sharma",
            role: "Software Engineer at Google",
            message: "The training at Blizzen Creations was exceptional. The hands-on projects and placement support helped me land my dream job at Google.",
            image: ""
          },
          {
            name: "Rajesh Kumar",
            role: "Data Scientist at Microsoft",
            message: "From zero coding knowledge to a data scientist role at Microsoft. The instructors are industry experts who really care about student success.",
            image: ""
          },
          {
            name: "Anitha Reddy",
            role: "Full Stack Developer at Amazon",
            message: "The comprehensive curriculum and real-world projects prepared me perfectly for the industry. Highly recommend Blizzen Creations!",
            image: ""
          }
        ],
        callToAction: {
          title: "Ready to Start Your Tech Journey?",
          description: "Join our next batch and transform your career with industry-leading training and guaranteed placement support.",
          buttonText: "Enroll Now"
        }
      });
      await homeContent.save();
    }

    res.json({
      success: true,
      data: homeContent
    });
  } catch (error) {
    console.error('Error fetching home content:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch home content',
      error: error.message
    });
  }
});

// POST /api/home-content - Create/Update home content (for admin)
router.post('/', async (req, res) => {
  try {
    const {
      heroTitle,
      heroDescription,
      heroImage,
      featuredCourses,
      stats,
      testimonials,
      callToAction
    } = req.body;

    // Validation
    if (!heroTitle || !heroDescription) {
      return res.status(400).json({
        success: false,
        message: 'Hero title and description are required'
      });
    }

    if (!callToAction || !callToAction.title || !callToAction.description || !callToAction.buttonText) {
      return res.status(400).json({
        success: false,
        message: 'Call to action fields are required'
      });
    }

    // Find existing content or create new
    let homeContent = await HomeContent.findOne();
    
    if (homeContent) {
      // Update existing
      homeContent.heroTitle = heroTitle;
      homeContent.heroDescription = heroDescription;
      homeContent.heroImage = heroImage || homeContent.heroImage;
      homeContent.featuredCourses = featuredCourses || homeContent.featuredCourses;
      homeContent.stats = stats || homeContent.stats;
      homeContent.testimonials = testimonials || homeContent.testimonials;
      homeContent.callToAction = callToAction;
    } else {
      // Create new
      homeContent = new HomeContent({
        heroTitle,
        heroDescription,
        heroImage,
        featuredCourses: featuredCourses || [],
        stats: stats || [],
        testimonials: testimonials || [],
        callToAction
      });
    }

    await homeContent.save();

    res.json({
      success: true,
      message: 'Home content updated successfully',
      data: homeContent
    });
  } catch (error) {
    console.error('Error updating home content:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update home content',
      error: error.message
    });
  }
});

// PUT /api/home-content - Alternative update method (keeping for backward compatibility)
router.put('/', async (req, res) => {
  try {
    let homeContent = await HomeContent.findOne();
    if (!homeContent) {
      homeContent = new HomeContent(req.body);
    } else {
      Object.assign(homeContent, req.body);
    }
    await homeContent.save();
    res.json({ 
      success: true, 
      message: 'Home content updated successfully', 
      data: homeContent 
    });
  } catch (error) {
    console.error('Error updating home content:', error);
    res.status(400).json({ 
      success: false, 
      message: error.message 
    });
  }
});

export default router;
