const checkAdmin = (req, res, next) => {
  try {
    // req.user should already be set by protect middleware
    if (!req.user) {
      return res.status(401).json({ message: "Not authorized" });
    }

    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied, admin only" });
    }

    next();
  } catch (error) {
    console.error("Error in checkAdmin middleware:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export default checkAdmin;
