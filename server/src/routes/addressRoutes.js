import express from "express";
import checkAuth from "../middlewares/checkAuth.js";
import { addAddress, getAddresses, updateAddress, deleteAddress } from "../controllers/addressController.js";

const router = express.Router();

router.get("/", checkAuth, getAddresses);             
router.post("/", checkAuth, addAddress);             
router.put("/:addressId", checkAuth, updateAddress);  
router.delete("/:addressId", checkAuth, deleteAddress); 

export default router;
