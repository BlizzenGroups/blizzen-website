import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import FooterContent from '../models/FooterContent.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '../../.env') });

const seedFooterContent = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await FooterContent.deleteMany({});
    console.log('Cleared existing footer content');

    // Insert new footer content
    const footerContent = await FooterContent.create({
      description: "Blizzen Creations is a premier IT training and placement institute dedicated to empowering students with cutting-edge skills and real-world experience in Chennai, Tamil Nadu.",
      socialLinks: [
        {
          name: 'Facebook',
          url: 'https://facebook.com/blizzencreations',
          icon: 'Facebook',
          isActive: true
        },
        {
          name: 'Instagram',
          url: 'https://instagram.com/blizzencreations',
          icon: 'Instagram',
          isActive: true
        },
        {
          name: 'LinkedIn',
          url: 'https://linkedin.com/company/blizzencreations',
          icon: 'Linkedin',
          isActive: true
        },
        {
          name: 'YouTube',
          url: 'https://youtube.com/@blizzencreations',
          icon: 'Youtube',
          isActive: true
        }
      ],
      quickLinks: [
        {
          label: 'About Us',
          path: '/about',
          isActive: true
        },
        {
          label: 'Courses',
          path: '/courses',
          isActive: true
        },
        {
          label: 'Placements',
          path: '/placements',
          isActive: true
        },
        {
          label: 'Contact',
          path: '/contact',
          isActive: true
        }
      ],
      showSocialLinks: true,
      showQuickLinks: true,
      copyright: '© 2024 Blizzen Creations. All rights reserved.'
    });

    console.log('✓ Footer content seeded successfully');
    console.log('Social Links:', footerContent.socialLinks.length);
    console.log('Quick Links:', footerContent.quickLinks.length);

    process.exit(0);
  } catch (error) {
    console.error('Error seeding footer content:', error);
    process.exit(1);
  }
};

seedFooterContent();
