import mongoose from 'mongoose';
import PlacementStats from '../models/PlacementStats.js';
import dotenv from 'dotenv';

dotenv.config();

const seedPlacementStats = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing placement stats
    await PlacementStats.deleteMany({});
    console.log('Cleared existing placement statistics');

    // Create realistic placement stats based on actual data
    const placementStats = new PlacementStats({
      totalPlacements: "500+",
      placementRate: "100%",
      averageSalary: "₹3.8 LPA",
      highestSalary: "₹10 LPA",
      companiesPartnered: "25+",
      topCompanies: "Zoho, Freshworks, Chargebee, Aspire Systems, Indium Software, GoFrugal, TVS Next, Ramco Systems, Intellect Design Arena, Saksoft, Ideas2IT, DataPatterns, Contus, Bahwan Cybertek, Prodapt Solutions, Agilisium Consulting, DCKAP, HTC Global Services, Infoview Technologies, Visteon, Payoda Technologies"
    });

    await placementStats.save();
    console.log('✓ Placement statistics seeded successfully');

    // Close connection
    await mongoose.connection.close();
    console.log('Database connection closed');
  } catch (error) {
    console.error('Error seeding placement stats:', error);
    process.exit(1);
  }
};

// Run the seed function
seedPlacementStats();