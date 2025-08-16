import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema({
  food: { type: mongoose.Schema.Types.ObjectId, ref: "food", required: true },
  quantity: { type: Number, required: true, min: 1 }
}, { _id: false });

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

  items: [orderItemSchema],

  totalPrice: {
    type: Number,
    required: true
  },

  address: {
    label: String,
    street: String,
    city: String,
    state: String,
    zip: String,
    country: String
  },

  paymentType: {
    type: String,
    enum: ["COD", "Razorpay", "Stripe"],
    required: true
  },

  paymentStatus: {
    type: String,
    enum: ["pending", "paid", "failed"],
    default: "pending"
  },

  orderStatus: {
    type: String,
    enum: ["Pending", "Preparing", "Out for Delivery", "Delivered", "Cancelled"],
    default: "Pending"
  },

}, { timestamps: true });

export default mongoose.model("Order", orderSchema);
