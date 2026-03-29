import mongoose from 'mongoose';

const homeContentSchema = new mongoose.Schema(
  {
    heroTitle: {
      type: String,
      required: true,
      default: 'Launch Your IT Career'
    },
    heroDescription: {
      type: String,
      required: true
    },
    heroImage: {
      type: String,
      default: ''
    },
    featuredCourses: [String],
    testimonials: [
      {
        name: String,
        role: String,
        message: String,
        image: String
      }
    ],
    stats: [
      {
        label: String,
        value: String
      }
    ],
    callToAction: {
      title: String,
      description: String,
      buttonText: String
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model('HomeContent', homeContentSchema);
