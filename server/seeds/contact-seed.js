import mongoose from 'mongoose';
import dotenv from 'dotenv';
import ContactInfo from '../models/ContactInfo.js';

dotenv.config();

const contactData = {
  companyName: "Blizzen Creations Training & Placements",
  address: "Y Block 1st street",
  city: "Anna Nagar",
  state: " Chennai",
  zipCode: "600040",
  country: "India",
  phone: [
    { label: "Main", number: "+91 9884264816" },
    { label: "Support", number: "+91 6382277657" }
  ],
  email: [
    { label: "Info", address: "blizzencreations@gmail.com" },
    { label: "Admissions", address: "careers.blizzencreations@gmail.com" },
    { label: "Support", address: "blizzengroups@gmail.com" }
  ],
  officeHours: {
    monday: "9 AM - 7 PM",
    tuesday: "9 AM - 7 PM",
    wednesday: "9 AM - 7 PM",
    thursday: "9 AM - 7 PM",
    friday: "9 AM - 7 PM",
    saturday: "10 AM - 5 PM",
    sunday: "Closed"
  },
  socialLinks: {
    facebook: "https://facebook.com/blizzencreations",
    twitter: "https://twitter.com/blizzencreations",
    linkedin: "https://linkedin.com/company/blizzencreations",
    instagram: "https://instagram.com/blizzencreations"
  },
  mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.5..."
};

async function seedContact() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✓ Connected to MongoDB');

    await ContactInfo.deleteMany({});
    console.log('✓ Cleared existing contact info');

    const result = await ContactInfo.create(contactData);
    console.log('✓ Seeded contact information successfully');

    await mongoose.connection.close();
    console.log('✓ Database connection closed');
  } catch (error) {
    console.error('✗ Error seeding contact info:', error);
    process.exit(1);
  }
}

seedContact();
