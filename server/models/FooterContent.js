import mongoose from 'mongoose';

const socialLinkSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    required: true // e.g., 'Facebook', 'Instagram', 'Linkedin', 'Youtube'
  },
  isActive: {
    type: Boolean,
    default: true
  }
});

const quickLinkSchema = new mongoose.Schema({
  label: {
    type: String,
    required: true
  },
  path: {
    type: String,
    required: true
  },
  isActive: {
    type: Boolean,
    default: true
  }
});

const footerContentSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
    default: "Blizzen Creations is a premier IT training and placement institute dedicated to empowering students with cutting-edge skills and real-world experience."
  },
  socialLinks: [socialLinkSchema],
  quickLinks: [quickLinkSchema],
  popularCourses: [{
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course'
    },
    title: String,
    slug: String
  }],
  showSocialLinks: {
    type: Boolean,
    default: true
  },
  showQuickLinks: {
    type: Boolean,
    default: true
  },
  showPopularCourses: {
    type: Boolean,
    default: true
  },
  copyright: {
    type: String,
    default: "© 2024 Blizzen Creations. All rights reserved."
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('FooterContent', footerContentSchema);
