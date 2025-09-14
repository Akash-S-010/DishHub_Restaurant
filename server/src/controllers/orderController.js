import Order from "../models/Order.js";
import User from "../models/User.js";
import Food from "../models/Food.js";
import Razorpay from "razorpay";
import crypto from "crypto";

// Initialize Razorpay instance (only if Razorpay is used)
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});



// Place New Order
export const placeOrder = async (req, res) => {
  try {
    const userId = req.user.id;
    const { items, totalPrice, address, paymentType } = req.body;

    // Validate items
    if (!items || items.length === 0) {
      return res.status(400).json({ message: "No items in order" });
    }

    // Check if food items exist
    for (const item of items) {
      const food = await Food.findById(item.food);
      if (!food) {
        return res.status(404).json({ message: `Food item not found: ${item.food}` });
      }
    }

    // Create order in DB
    const order = new Order({
      user: userId,
      items,
      totalPrice,
      address,
      paymentType,
      // For COD we'll keep pending, for Razorpay we'll start as pending and mark paid after verification
      paymentStatus: paymentType === "COD" ? "pending" : "pending",
    });

    await order.save();

    // Add order to user's order history
    const user = await User.findById(userId);
    user.orderHistory.push(order.id);
    
    // Only clear cart for COD orders immediately
    // For Razorpay, we'll clear it after payment verification
    if (paymentType === "COD") {
      user.cart = []; // clear cart after placing order
    }
    await user.save();

    // If Razorpay payment requested, create a Razorpay order and return details to client
    if (paymentType === "Razorpay") {
      if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
        return res.status(500).json({ message: "Razorpay not configured on server" });
      }

      const razorpayOrder = await razorpay.orders.create({
        amount: Math.round(totalPrice * 100), // amount in paise
        currency: "INR",
        receipt: order._id.toString(),
      });

      return res.status(201).json({
        message: "Order created, proceed to payment",
        order,
        razorpayOrder,
        key_id: process.env.RAZORPAY_KEY_ID,
      });
    }

    // For COD simply return the order
    return res.status(201).json({
      message: "Order placed successfully",
      order,
    });

  } catch (error) {
    console.error("Error in placeOrder:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};



// Verify Razorpay Payment
export const verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, orderId } = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({ message: "Invalid signature, payment verification failed" });
    }

    // Update order status
    const order = await Order.findById(orderId);
    if (!order) return res.status(404).json({ message: "Order not found" });

    order.paymentStatus = "paid";
    order.orderStatus = "Preparing";
    order.razorpayPaymentId = razorpay_payment_id;
    await order.save();
    
    // Clear the user's cart after successful payment verification
    const user = await User.findById(order.user);
    if (user) {
      user.cart = [];
      await user.save();
    }

    return res.status(200).json({ message: "Payment verified successfully", order });
  } catch (error) {
    console.error("Error in verifyPayment:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Cancel Razorpay Payment
export const cancelPayment = async (req, res) => {
  try {
    const { orderId } = req.body;
    
    // Find the order
    const order = await Order.findById(orderId);
    if (!order) return res.status(404).json({ message: "Order not found" });
    
    // Only delete if it's a Razorpay order that's still pending
    if (order.paymentType === "Razorpay" && order.paymentStatus === "pending") {
      // Delete the order completely instead of marking it as failed
      await Order.findByIdAndDelete(orderId);
      
      // Remove the order from user's order history
      const user = await User.findById(order.user);
      if (user) {
        user.orderHistory = user.orderHistory.filter(id => id.toString() !== orderId.toString());
        await user.save();
      }
    }
    
    return res.status(200).json({ message: "Payment cancelled" });
  } catch (error) {
    console.error("Error in cancelPayment:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};



// Get Logged-in User Orders
export const getMyOrders = async (req, res) => {
  try {
    const userId = req.user.id;
    const orders = await Order.find({ user: userId })
      .populate("items.food", "name price image")
      .sort({ createdAt: -1 });

    return res.status(200).json(orders);
  } catch (error) {
    console.error("Error in getMyOrders:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};



// Admin: Get All Orders
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email phone")
      .populate("items.food", "name price image")
      .sort({ createdAt: -1 });

    return res.status(200).json(orders);
  } catch (error) {
    console.error("Error in getAllOrders:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};



// Admin: Update Order Status
export const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { orderStatus } = req.body;

    const order = await Order.findById(id);
    if (!order) return res.status(404).json({ message: "Order not found" });

    order.orderStatus = orderStatus;
    await order.save();

    return res.status(200).json({ message: "Order status updated", order });
  } catch (error) {
    console.error("Error in updateOrderStatus:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Admin: Update Order Payment Status
export const updatePaymentStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { paymentStatus } = req.body;

    const order = await Order.findById(id);
    if (!order) return res.status(404).json({ message: "Order not found" });

    order.paymentStatus = paymentStatus;
    await order.save();

    return res.status(200).json({ message: "Order payment status updated", order });
  } catch (error) {
    console.error("Error in updatePaymentStatus:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
