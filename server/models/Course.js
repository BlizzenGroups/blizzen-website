import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Course title is required'],
      trim: true
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true
    },
    description: {
      type: String,
      required: [true, 'Course description is required']
    },
    shortDescription: {
      type: String,
      required: true
    },
    duration: {
      type: String,
      required: true
    },
    mentorshipType: {
      type: String,
      default: 'Expert Mentorship'
    },
    level: {
      type: String,
      enum: ['Beginner', 'Intermediate', 'Advanced'],
      default: 'Beginner'
    },
    price: {
      type: Number,
      default: 0
    },
    instructor: {
      type: String,
      required: true
    },
    image: {
      type: String,
      default: ''
    },
    syllabus: {
      type: String,
      default: ''
    },
    // Course Overview Section
    courseOverview: {
      title: {
        type: String,
        default: 'Course Overview'
      },
      content: {
        type: String,
        default: ''
      },
      showSection: {
        type: Boolean,
        default: true
      }
    },
    // What You'll Learn Section
    whatYouLearn: {
      title: {
        type: String,
        default: "What You'll Learn"
      },
      items: [String],
      showSection: {
        type: Boolean,
        default: true
      }
    },
    highlights: [String],
    curriculum: [
      {
        module: String,
        topics: [String]
      }
    ],
    prerequisites: [String],
    // Section visibility toggles
    showHeroSection: {
      type: Boolean,
      default: true
    },
    showModulesSection: {
      type: Boolean,
      default: true
    },
    showFeaturesSection: {
      type: Boolean,
      default: true
    },
    showCtaSection: {
      type: Boolean,
      default: true
    },
    isActive: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model('Course', courseSchema);
