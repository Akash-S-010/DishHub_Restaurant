import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema({
  food: { type: mongoose.Schema.Types.ObjectId, ref: "Food", required: true },
  quantity: { type: Number, required: true, min: 1 }
}, { _id: false });

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

  items: [orderItemSchema],

  totalPrice: {
    type: Number,
    required: true,
    min: 0
  },

  address: {
  label: { type: String, required: true }, // house no / apartment / building
  buildingName: { type: String }, // optional: some schemas expect buildingName
  street: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  pincode: { type: String, required: true },
  country: { type: String, default: 'India' }
  },

  paymentType: {
    type: String,
    enum: ["COD", "Razorpay"],
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
