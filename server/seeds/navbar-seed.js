import mongoose from 'mongoose';
import Navbar from '../models/Navbar.js';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/blizzen-launchpad';

const navbarData = {
  links: [
    { name: 'Home', path: '/', isActive: true, order: 1 },
    { name: 'About', path: '/about', isActive: true, order: 2 },
    { name: 'Courses', path: '/courses', isActive: true, order: 3 },
    { name: 'Placements', path: '/placements', isActive: true, order: 4 },
    { name: 'Blog', path: '/blog', isActive: true, order: 5 },
    { name: 'Contact', path: '/contact', isActive: true, order: 6 }
  ],
  showEnquiryButton: true,
  enquiryButtonText: 'Get Started'
};

async function seedNavbar() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✓ Connected to MongoDB');

    await Navbar.deleteMany({});
    console.log('✓ Cleared existing navbar data');

    const navbar = await Navbar.create(navbarData);
    console.log('✓ Created navbar configuration');
    console.log(`  - ${navbar.links.length} navigation links`);
    console.log(`  - Enquiry button: ${navbar.showEnquiryButton ? 'Enabled' : 'Disabled'}`);

    process.exit(0);
  } catch (error) {
    console.error('✗ Seed error:', error);
    process.exit(1);
  }
}

seedNavbar();
