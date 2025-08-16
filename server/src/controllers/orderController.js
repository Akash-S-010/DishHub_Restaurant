import Order from "../models/order.model.js";
import Food from "../models/food.model.js";
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
    const { items, address, paymentType } = req.body;
    const userId = req.user._id;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: "No items in order" });
    }

    // Calculate total price
    let totalPrice = 0;
    for (let item of items) {
      const food = await Food.findById(item.food);
      if (!food) return res.status(404).json({ message: "Food not found" });
      totalPrice += food.price * item.quantity;
    }

    // Create order object (before payment)
    const order = new Order({
      user: userId,
      items,
      totalPrice,
      address,
      paymentType,
      paymentStatus: paymentType === "COD" ? "pending" : "pending",
    });

    if (paymentType === "COD") {
      await order.save();
      return res.status(201).json({
        message: "Order placed successfully with COD",
        order,
      });
    }

    if (paymentType === "Razorpay") {
      const options = {
        amount: totalPrice * 100, // in paise
        currency: "INR",
        receipt: `order_${Date.now()}`,
      };

      const razorpayOrder = await razorpay.orders.create(options);

      // Save order with Razorpay details
      order.razorpayOrderId = razorpayOrder.id;
      await order.save();

      return res.status(201).json({
        message: "Razorpay order created",
        razorpayOrder,
        orderId: order._id,
      });
    }

    return res.status(400).json({ message: "Invalid payment type" });
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

    return res.status(200).json({ message: "Payment verified successfully", order });
  } catch (error) {
    console.error("Error in verifyPayment:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};



// Get Logged-in User Orders
export const getMyOrders = async (req, res) => {
  try {
    const userId = req.user._id;
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
