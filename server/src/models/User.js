import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
  label: { type: String, required: true }, // e.g., "Home", "Office"
  street: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  zip: { type: String, required: true },
  country: { type: String, required: true },
}, { _id: true });

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  phone: {
    type: String,
    required: true,
    trim: true,
    match: [/^[6-9]\d{9}$/, "Please enter a valid 10-digit mobile number"],
    unique: true,
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

  isBlocked: {
    type: Boolean,
    default: false
  },

}, { timestamps: true }); // createdAt, updatedAt

export default mongoose.model("User", userSchema);