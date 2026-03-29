import mongoose from 'mongoose';

const contactInfoSchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      required: true,
      default: 'Blizzen Creations'
    },
    address: {
      type: String,
      required: true
    },
    city: {
      type: String,
      required: true
    },
    state: {
      type: String,
      required: true
    },
    zipCode: {
      type: String,
      required: true
    },
    country: {
      type: String,
      required: true,
      default: 'India'
    },
    phone: [
      {
        label: String,
        number: String
      }
    ],
    email: [
      {
        label: String,
        address: String
      }
    ],
    officeHours: {
      monday: String,
      tuesday: String,
      wednesday: String,
      thursday: String,
      friday: String,
      saturday: String,
      sunday: String
    },
    socialLinks: {
      facebook: String,
      twitter: String,
      linkedin: String,
      instagram: String
    },
    mapEmbedUrl: {
      type: String,
      default: ''
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model('ContactInfo', contactInfoSchema);
