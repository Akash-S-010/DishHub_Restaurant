import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  rating: { type: Number, min: 1, max: 5, required: true },
  comment: { type: String, trim: true },
  createdAt: { type: Date, default: Date.now }
}, { _id: false });

const foodSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },

  category: {
    type: String,
    required: true
  },

  price: {
    type: Number,
    required: true
  },

  description: {
    type: String,
    trim: true
  },

  image: {
    type: String, // URL (Cloudinary/S3)
    required: true
  },

  stockAvailable: {
    type: Boolean,
    default: true
  },

  reviews: [reviewSchema], // Embedded reviews
  
  avgRating: {
    type: Number,
    default: 0
  }

}, { timestamps: true });

export default mongoose.model("food", foodSchema);
