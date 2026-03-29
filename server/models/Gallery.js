import mongoose from "mongoose";

const gallerySchema = new mongoose.Schema({
  url: { type: String, required: true },
  public_id: { type: String, required: true } // 🔥 IMPORTANT
});

export default mongoose.model("Gallery", gallerySchema);
