import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
  label: { type: String, required: true }, // e.g., "Home", "Office"
  street: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  pincode: { type: String, required: true },
  country: { type: String, required: true },
}, { _id: true });

const cartItemSchema = new mongoose.Schema({
  food: { type: mongoose.Schema.Types.ObjectId, ref: "Food", required: true },
  quantity: { type: Number, required: true, min: 1, default: 1 }
}, { _id: false });

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
    type: String // for Google OAuth 
  },

  addresses: [addressSchema], 

  wishlist: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Food" }
  ],

  cart: [cartItemSchema], 

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

}, { timestamps: true }); 

export default mongoose.model("User", userSchema);