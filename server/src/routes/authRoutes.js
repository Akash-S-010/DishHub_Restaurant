import express from 'express';
import { getAllUsers, getUser, loginUser, signupUser, toggleBlockUser, updateProfile } from '../controllers/authController';
import checkAuth from '../middlewares/checkAuth.js';
import checkAdmin from '../middlewares/checkAdmin.js';
const router = express.Router();

router.post('/signup', signupUser);
router.post('/login', loginUser);
router.get("/me", checkAuth, getUser);
router.put("/update-profile", checkAuth, updateProfile);

// Admin routes
router.get("/all-users", checkAdmin, getAllUsers)
router.patch("/:id/block", checkAdmin, toggleBlockUser)


export default router;