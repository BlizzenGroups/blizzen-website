import mongoose from 'mongoose';

const enquirySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      minlength: [2, 'Name must be at least 2 characters']
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      lowercase: true,
      match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email']
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      match: [/^[\d\s\-\+\(\)]{7,}$/, 'Please provide a valid phone number']
    },
    course: {
      type: String,
      required: [true, 'Course selection is required'],
      enum: [
        'python',
        'web',
        'ai',
        'data',
        'cloud',
        'security',
        'design',
        'marketing'
      ]
    },
    qualification: {
      type: String,
      enum: ['10th', '12th', 'diploma', 'graduate', 'postgraduate', ''],
      default: ''
    },
    experience: {
      type: String,
      enum: ['fresher', '0-1', '1-3', '3-5', '5+', ''],
      default: ''
    },
    placementRequired: {
      type: String,
      enum: ['yes', 'no', 'maybe', ''],
      default: ''
    },
    message: {
      type: String,
      trim: true,
      maxlength: [1000, 'Message cannot exceed 1000 characters']
    },
    status: {
      type: String,
      enum: ['new', 'contacted', 'enrolled', 'rejected'],
      default: 'new'
    },
    notes: {
      type: String,
      default: ''
    }
  },
  {
    timestamps: true
  }
);

// Index for faster queries
enquirySchema.index({ email: 1 });
enquirySchema.index({ createdAt: -1 });

export default mongoose.model('Enquiry', enquirySchema);
