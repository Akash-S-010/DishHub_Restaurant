import express from "express";
import checkAuth from "../middlewares/checkAuth.js";
import { addToWishlist, removeFromWishlist, getWishlist } from "../controllers/wishlistController.js";

const router = express.Router();

router.get("/", checkAuth, getWishlist);
router.post("/:foodId", checkAuth, addToWishlist);
router.delete("/:foodId", checkAuth, removeFromWishlist);

export default router;
