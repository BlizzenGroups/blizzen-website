import express from 'express';
import Placement from '../models/Placement.js';

const router = express.Router();

// Get all placements
router.get('/', async (req, res) => {
  try {
    const placements = await Placement.find({ isActive: true }).sort({ placementDate: -1 });
    res.json({ success: true, data: placements });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get single placement
router.get('/:id', async (req, res) => {
  try {
    const placement = await Placement.findById(req.params.id);
    if (!placement) {
      return res.status(404).json({ success: false, message: 'Placement not found' });
    }
    res.json({ success: true, data: placement });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Create placement (admin)
router.post('/', async (req, res) => {
  try {
    const placement = new Placement(req.body);
    await placement.save();
    res.status(201).json({ success: true, message: 'Placement created', data: placement });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// Update placement (admin)
router.put('/:id', async (req, res) => {
  try {
    const placement = await Placement.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!placement) {
      return res.status(404).json({ success: false, message: 'Placement not found' });
    }
    res.json({ success: true, message: 'Placement updated', data: placement });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// Delete placement (admin)
router.delete('/:id', async (req, res) => {
  try {
    const placement = await Placement.findByIdAndDelete(req.params.id);
    if (!placement) {
      return res.status(404).json({ success: false, message: 'Placement not found' });
    }
    res.json({ success: true, message: 'Placement deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
