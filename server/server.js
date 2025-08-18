import express from 'express';
import "dotenv/config";
import cors from 'cors';
import connectDB from './src/config/db.js';
import userRoutes from './src/routes/authRoutes.js';
import foodRoutes from './src/routes/foodRoutes.js';
import orderRoutes from './src/routes/orderRoutes.js';

const app = express();
const PORT = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());


// test route
app.use("/api/status", (req, res) => {
    res.send("Server is running");
})

// api Routes
app.use("/api/user", userRoutes)
app.use("/api/food", foodRoutes);
app.use("/api/order", orderRoutes);


// Run Server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectDB();
});


