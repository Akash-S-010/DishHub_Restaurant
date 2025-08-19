import jwt from "jsonwebtoken";
import User from "../models/User.js";

const checkAdmin = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "Not authorized, no token" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return res.status(401).json({ message: "Not authorized, user not found" });
    }

    if (user.role !== "admin") {
      return res.status(403).json({ message: "Access denied, admin only" });
    }

    req.user = user;

    next();

  } catch (error) {
    console.error("Error in checkAdmin middleware:", error);
    return res.status(401).json({ message: "Not authorized" });
  }
};

export default checkAdmin;
