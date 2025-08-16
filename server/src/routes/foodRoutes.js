import express from "express";
import checkAuth from "../middlewares/checkAuth.js";
import checkAdmin from "../middlewares/checkAdmin.js";
import { addReview, createFood, deleteFood, getAllFood, getFoodById, updateFood } from "../controllers/foodController.js";

const router = express.Router();

// Public routes
router.get("/all-food", getAllFood);           
router.get("/:id", getFoodById);         

// Protected routes (Admin only)
router.post("/create", checkAdmin, createFood); 
router.put("/:id/", checkAdmin, updateFood); 
router.delete("/:id/delete", checkAdmin, deleteFood); 

// checkAuthed route (User can add review)
router.post("/:id/review", checkAuth, addReview)


export default router;