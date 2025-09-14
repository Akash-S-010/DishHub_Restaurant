import express from "express";
import checkAuth from "../middlewares/checkAuth.js";
import checkAdmin from "../middlewares/checkAdmin.js";
import { placeOrder, verifyPayment, cancelPayment, getMyOrders, getAllOrders, updateOrderStatus, updatePaymentStatus} from "../controllers/orderController.js";

const router = express.Router();

// User routes
router.post("/place", checkAuth, placeOrder);
router.post("/verify", checkAuth, verifyPayment);
router.post("/cancel", checkAuth, cancelPayment);
router.get("/my-orders", checkAuth, getMyOrders);

// Admin routes
router.get("/", checkAuth, checkAdmin, getAllOrders);
router.put("/:id/status", checkAuth, checkAdmin, updateOrderStatus);
router.put("/:id/payment-status", checkAuth, checkAdmin, updatePaymentStatus);

export default router;
