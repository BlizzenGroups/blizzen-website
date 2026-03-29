import mongoose from 'mongoose';

const placementStatsSchema = new mongoose.Schema(
  {
    totalPlacements: {
      type: String,
      required: true,
      default: "500+"
    },
    placementRate: {
      type: String,
      required: true,
      default: "95%"
    },
    averageSalary: {
      type: String,
      required: true,
      default: "₹5 LPA"
    },
    highestSalary: {
      type: String,
      required: true,
      default: "₹25 LPA"
    },
    companiesPartnered: {
      type: String,
      required: true,
      default: "100+"
    },
    topCompanies: {
      type: String,
      required: true,
      default: "Google, Microsoft, Amazon, TCS, Infosys"
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model('PlacementStats', placementStatsSchema);