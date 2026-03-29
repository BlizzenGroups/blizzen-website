import mongoose from 'mongoose';

const navbarSchema = new mongoose.Schema({
  logo: {
    type: String,
    default: ''
  },
  links: [{
    name: {
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
    },
    order: {
      type: Number,
      default: 0
    }
  }],
  showEnquiryButton: {
    type: Boolean,
    default: true
  },
  enquiryButtonText: {
    type: String,
    default: 'Get Started'
  }
}, {
  timestamps: true
});

export default mongoose.model('Navbar', navbarSchema);
