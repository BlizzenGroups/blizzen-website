import express from 'express';
import Navbar from '../models/Navbar.js';

const router = express.Router();

// Get navbar content
router.get('/', async (req, res) => {
  try {
    let navbar = await Navbar.findOne();
    
    // Create default if doesn't exist
    if (!navbar) {
      navbar = await Navbar.create({
        links: [
          { name: 'Home', path: '/', isActive: true, order: 1 },
          { name: 'About', path: '/about', isActive: true, order: 2 },
          { name: 'Courses', path: '/courses', isActive: true, order: 3 },
          { name: 'Placements', path: '/placements', isActive: true, order: 4 },
          { name: 'Blog', path: '/blog', isActive: true, order: 5 },
          { name: 'Contact', path: '/contact', isActive: true, order: 6 }
        ]
      });
    }
    
    // Fix: add Contact if missing
    const hasContact = navbar.links.some(l => l.path === '/contact');
    if (!hasContact) {
      navbar.links.push({ name: 'Contact', path: '/contact', isActive: true, order: 6 });
      await navbar.save();
    }
    
    res.json({ success: true, data: navbar });
  } catch (error) {
    console.error('Error fetching navbar:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// Update navbar content
router.post('/', async (req, res) => {
  try {
    let navbar = await Navbar.findOne();
    
    if (navbar) {
      Object.assign(navbar, req.body);
      await navbar.save();
    } else {
      navbar = await Navbar.create(req.body);
    }
    
    res.json({ success: true, data: navbar });
  } catch (error) {
    console.error('Error updating navbar:', error);
    res.status(400).json({ success: false, message: error.message });
  }
});

export default router;
