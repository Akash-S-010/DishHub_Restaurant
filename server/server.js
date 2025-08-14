import express from 'express';
import "dotenv/config";
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());


// test route
app.use("/api/status", (req, res) => {
    res.send("Server is running");
})


// Run Server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


