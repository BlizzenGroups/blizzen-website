import express from 'express';
import About from '../models/About.js';

const router = express.Router();

/* ------------------------------
   GET About Content
-------------------------------- */
router.get('/', async (req, res) => {
  try {
    let about = await About.findOne();

    // Create initial document if none exists
    if (!about) {
      about = new About({
        title: 'About Blizzen Creations',
        heroDescription: 'Welcome to Blizzen Creations',
        missionDescription: 'Our mission is to provide quality education',
        visionDescription: 'Our vision is to create skilled professionals',
        scrollImages: []  // added default field
      });
      await about.save();
    }

    res.json({ success: true, data: about });

  } catch (error) {
    console.error("✗ Error fetching About:", error);
    res.status(500).json({ success: false, message: error.message });
  }
});

/* ------------------------------
   UPDATE About Content (Admin)
-------------------------------- */
router.put('/', async (req, res) => {
  try {
    console.log('Updating About Content...');
    console.log('whyChooseUs received:', JSON.stringify(req.body.whyChooseUs, null, 2));

    let about = await About.findOne();

    // Create new document if not found
    if (!about) {
      about = new About(req.body);
    } else {
      // Merge new data into existing document
      Object.assign(about, req.body);
      // Mark whyChooseUs as modified to ensure nested object saves
      about.markModified('whyChooseUs');
    }

    await about.save();

    console.log('✓ About updated successfully');
    console.log('Saved whyChooseUs:', JSON.stringify(about.whyChooseUs, null, 2));
    
    res.json({
      success: true,
      message: 'About content updated successfully',
      data: about
    });

  } catch (error) {
    console.error('✗ Error updating About:', error);
    res.status(400).json({ success: false, message: error.message });
  }
});

export default router;
