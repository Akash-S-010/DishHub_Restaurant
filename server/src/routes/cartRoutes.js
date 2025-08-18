import express from "express";
import checkAuth from "../middlewares/checkAuth.js";
import { addToCart, getCart, updateCartItem, removeFromCart, clearCart } from "../controllers/cartController.js";

const router = express.Router();

router.use(checkAuth);

router.post("/add", addToCart);          
router.get("/", getCart);                
router.put("/update", updateCartItem);
router.delete("/remove/:foodId", removeFromCart);
router.delete("/clear", clearCart);   

export default router;
