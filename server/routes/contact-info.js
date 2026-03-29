import express from 'express';
import ContactInfo from '../models/ContactInfo.js';

const router = express.Router();

// Get contact info
router.get('/', async (req, res) => {
  try {
    let contactInfo = await ContactInfo.findOne();
    if (!contactInfo) {
      contactInfo = new ContactInfo({
        companyName: 'Blizzen Creations',
        address: 'Tech City, Innovation Hub',
        city: 'Bangalore',
        state: 'Karnataka',
        zipCode: '560001',
        country: 'India'
      });
      await contactInfo.save();
    }
    res.json({ success: true, data: contactInfo });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Update contact info (admin)
router.put('/', async (req, res) => {
  try {
    let contactInfo = await ContactInfo.findOne();
    if (!contactInfo) {
      contactInfo = new ContactInfo(req.body);
    } else {
      Object.assign(contactInfo, req.body);
    }
    await contactInfo.save();
    res.json({ success: true, message: 'Contact info updated', data: contactInfo });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

export default router;
