import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const checkAuth = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "Not authorized, no token" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Use decoded.userId now
    req.user = await User.findById(decoded.userId).select("-password");
    if (!req.user) {
      return res.status(404).json({ message: "User not found" });
    }

    next();
  } catch (error) {
    console.error("Auth error:", error);
    return res.status(401).json({ message: "Not authorized" });
  }
};

export default checkAuth;
