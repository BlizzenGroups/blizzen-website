import express from 'express';
import PlacementStats from '../models/PlacementStats.js';

const router = express.Router();

// GET /api/placement-stats - Fetch placement statistics
router.get('/', async (req, res) => {
  try {
    let placementStats = await PlacementStats.findOne();
    
    // If no stats exist, create default stats
    if (!placementStats) {
      placementStats = new PlacementStats({
        totalPlacements: "500+",
        placementRate: "95%",
        averageSalary: "₹5 LPA",
        highestSalary: "₹25 LPA",
        companiesPartnered: "100+",
        topCompanies: "Google, Microsoft, Amazon, TCS, Infosys"
      });
      await placementStats.save();
    }

    res.json({
      success: true,
      data: placementStats
    });
  } catch (error) {
    console.error('Error fetching placement stats:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch placement statistics',
      error: error.message
    });
  }
});

// POST /api/placement-stats - Create/Update placement statistics
router.post('/', async (req, res) => {
  try {
    const {
      totalPlacements,
      placementRate,
      averageSalary,
      highestSalary,
      companiesPartnered,
      topCompanies
    } = req.body;

    // Validation
    if (!totalPlacements || !placementRate || !averageSalary || !highestSalary || !companiesPartnered || !topCompanies) {
      return res.status(400).json({
        success: false,
        message: 'All placement statistics fields are required'
      });
    }

    // Find existing stats or create new
    let placementStats = await PlacementStats.findOne();
    
    if (placementStats) {
      // Update existing
      placementStats.totalPlacements = totalPlacements;
      placementStats.placementRate = placementRate;
      placementStats.averageSalary = averageSalary;
      placementStats.highestSalary = highestSalary;
      placementStats.companiesPartnered = companiesPartnered;
      placementStats.topCompanies = topCompanies;
    } else {
      // Create new
      placementStats = new PlacementStats({
        totalPlacements,
        placementRate,
        averageSalary,
        highestSalary,
        companiesPartnered,
        topCompanies
      });
    }

    await placementStats.save();

    res.json({
      success: true,
      message: 'Placement statistics updated successfully',
      data: placementStats
    });
  } catch (error) {
    console.error('Error updating placement stats:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update placement statistics',
      error: error.message
    });
  }
});

export default router;