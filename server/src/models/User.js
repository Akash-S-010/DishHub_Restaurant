import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
  label: { type: String, required: true }, // e.g., "Home", "Office"
  street: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  zip: { type: String, required: true },
  country: { type: String, required: true },
}, { _id: false }); // no separate _id for subdocs

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  
  password: {
    type: String,
    minlength: 6
  },
  
  googleId: { 
    type: String // for Google OAuth users
  },

  addresses: [addressSchema], // Embedded addresses
  
  wishlist: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Dish" }
  ],

  orderHistory: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Order" }
  ],

  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user"
  },

  isBanned: {
    type: Boolean,
    default: false
  },

}, { timestamps: true }); // createdAt, updatedAt

export default mongoose.model("User", userSchema);