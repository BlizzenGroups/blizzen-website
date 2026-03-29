import express from 'express';
import TrustStats from '../models/TrustStats.js';

const router = express.Router();

// Get trust stats
router.get('/', async (req, res) => {
  try {
    const trustStats = await TrustStats.findOne({ isActive: true });
    if (!trustStats) {
      // Return default values if no data exists
      return res.json({
        studentCount: '1,000+',
        studentLabel: 'Students Alumni',
        ratingPlatforms: [
          {
            name: 'Trustpilot',
            rating: 4.8,
            icon: 'trustpilot',
            color: '#00b67a',
            isActive: true
          },
          {
            name: 'Google',
            rating: 4.9,
            icon: 'google',
            color: '#4285F4',
            isActive: true
          }
        ]
      });
    }
    res.json(trustStats);
  } catch (error) {
    console.error('Error fetching trust stats:', error);
    res.status(500).json({ error: 'Failed to fetch trust stats' });
  }
});

// Update trust stats
router.post('/', async (req, res) => {
  try {
    const { studentCount, studentLabel, ratingPlatforms } = req.body;

    // Validate rating platforms
    if (ratingPlatforms && Array.isArray(ratingPlatforms)) {
      for (const platform of ratingPlatforms) {
        if (platform.rating < 0 || platform.rating > 5) {
          return res.status(400).json({ error: `${platform.name} rating must be between 0 and 5` });
        }
      }
    }

    // Find existing or create new
    let trustStats = await TrustStats.findOne({ isActive: true });

    if (trustStats) {
      trustStats.studentCount = studentCount;
      trustStats.studentLabel = studentLabel;
      if (ratingPlatforms) trustStats.ratingPlatforms = ratingPlatforms;
      await trustStats.save();
    } else {
      trustStats = new TrustStats({
        studentCount,
        studentLabel,
        ratingPlatforms: ratingPlatforms || [
          {
            name: 'Trustpilot',
            rating: 4.8,
            icon: 'trustpilot',
            color: '#00b67a',
            isActive: true
          },
          {
            name: 'Google',
            rating: 4.9,
            icon: 'google',
            color: '#4285F4',
            isActive: true
          }
        ]
      });
      await trustStats.save();
    }

    res.json(trustStats);
  } catch (error) {
    console.error('Error updating trust stats:', error);
    res.status(500).json({ error: 'Failed to update trust stats' });
  }
});

export default router;