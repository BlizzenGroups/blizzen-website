import mongoose from 'mongoose';

const placementSchema = new mongoose.Schema(
  {
    studentName: { type: String, required: true },
    course: { type: String, required: true },
    company: { type: String, required: true },
    position: { type: String, required: true },

    isActive: { type: Boolean, default: true }
  },
  { timestamps: true }
);


export default mongoose.model('Placement', placementSchema);
