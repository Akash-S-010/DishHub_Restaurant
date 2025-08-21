import express from 'express';
import "dotenv/config";
import cors from 'cors';
import cookieParser from 'cookie-parser';
import connectDB from './src/config/db.js';
import userRoutes from './src/routes/authRoutes.js';
import foodRoutes from './src/routes/foodRoutes.js';
import orderRoutes from './src/routes/orderRoutes.js';
import wishlistRoutes from './src/routes/wishlistRoutes.js';
import cartRoutes from './src/routes/cartRoutes.js';
import addressRoutes from './src/routes/addressRoutes.js';

const app = express();
const PORT = process.env.PORT || 5000;


app.use(cors( {
    origin: process.env.CLIENT_URL,
    credentials: true,
}));
app.use(express.json());
app.use(cookieParser()); 


// test route
app.use("/api/status", (req, res) => {
    res.send("Server is running");
})

// api Routes
app.use("/api/user", userRoutes)
app.use("/api/food", foodRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/address", addressRoutes);


// Run Server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectDB();
});


