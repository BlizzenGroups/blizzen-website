import express from 'express';
import Blog from '../models/Blog.js';

const router = express.Router();

// Get all published blogs (for frontend)
router.get('/', async (req, res) => {
  try {
    const { category } = req.query;
    const query = { published: true };
    
    if (category && category !== 'all') {
      query.category = category;
    }

    const blogs = await Blog.find(query)
      .sort({ publishedAt: -1 })
      .select('-content'); // Exclude full content for list view
    
    res.json({ success: true, data: blogs });
  } catch (error) {
    console.error('Error fetching blogs:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get all blogs (for admin - includes unpublished)
router.get('/admin/all', async (req, res) => {
  try {
    const blogs = await Blog.find()
      .sort({ createdAt: -1 });
    
    res.json({ success: true, data: blogs });
  } catch (error) {
    console.error('Error fetching blogs:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get single blog by slug
router.get('/:slug', async (req, res) => {
  try {
    const blog = await Blog.findOne({ 
      slug: req.params.slug,
      published: true 
    });
    
    if (!blog) {
      return res.status(404).json({ success: false, message: 'Blog not found' });
    }
    
    res.json({ success: true, data: blog });
  } catch (error) {
    console.error('Error fetching blog:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// Create blog (admin)
router.post('/', async (req, res) => {
  try {
    console.log('📝 Creating blog with data:', req.body);
    const blog = new Blog(req.body);
    await blog.save();
    console.log('✓ Blog created successfully:', blog._id);
    
    res.status(201).json({ success: true, data: blog });
  } catch (error) {
    console.error('✗ Error creating blog:', error);
    console.error('✗ Validation errors:', error.errors);
    res.status(400).json({ 
      success: false, 
      message: error.message,
      errors: error.errors 
    });
  }
});

// Update blog (admin)
router.put('/:id', async (req, res) => {
  try {
    const blog = await Blog.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!blog) {
      return res.status(404).json({ success: false, message: 'Blog not found' });
    }
    
    res.json({ success: true, data: blog });
  } catch (error) {
    console.error('Error updating blog:', error);
    res.status(400).json({ success: false, message: error.message });
  }
});

// Delete blog (admin)
router.delete('/:id', async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    
    if (!blog) {
      return res.status(404).json({ success: false, message: 'Blog not found' });
    }
    
    res.json({ success: true, message: 'Blog deleted successfully' });
  } catch (error) {
    console.error('Error deleting blog:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// Toggle publish status (admin)
router.patch('/:id/publish', async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    
    if (!blog) {
      return res.status(404).json({ success: false, message: 'Blog not found' });
    }
    
    blog.published = !blog.published;
    if (blog.published) {
      blog.publishedAt = new Date();
    }
    await blog.save();
    
    res.json({ success: true, data: blog });
  } catch (error) {
    console.error('Error toggling publish status:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
