import mongoose from 'mongoose';

const ratingPlatformSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: true,
    min: 0,
    max: 5
  },
  icon: {
    type: String,
    default: ''
  },
  color: {
    type: String,
    default: '#FFC107'
  },
  isActive: {
    type: Boolean,
    default: true
  }
});

const trustStatsSchema = new mongoose.Schema(
  {
    studentCount: {
      type: String,
      required: [true, 'Student count is required'],
      default: '1,00,000+'
    },
    studentLabel: {
      type: String,
      required: [true, 'Student label is required'],
      default: 'Students Alumni'
    },
    ratingPlatforms: [ratingPlatformSchema],
    isActive: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model('TrustStats', trustStatsSchema);