import User from "../models/User.js";
import Food from "../models/Food.js";


export const addToWishlist = async (req, res) => {
  try {
    const userId = req.user._id; 
    const { foodId } = req.params;

    // Check if food exists
    const food = await Food.findById(foodId);
    if (!food) {
      return res.status(404).json({ message: "Food not found" });
    }

    const user = await User.findById(userId);

    // Prevent duplicate
    if (user.wishlist.includes(foodId)) {
      return res.status(400).json({ message: "Already in wishlist" });
    }

    user.wishlist.push(foodId);
    await user.save();

    return res.status(200).json({
      message: "Added to wishlist",
      wishlist: user.wishlist,
    });
  } catch (error) {
    console.error("Error in addToWishlist:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};



export const removeFromWishlist = async (req, res) => {
  try {
    const userId = req.user._id;
    const { foodId } = req.params;

    const user = await User.findById(userId);

    if (!user.wishlist.includes(foodId)) {
      return res.status(400).json({ message: "Not in wishlist" });
    }

    user.wishlist = user.wishlist.filter(
      (item) => item.toString() !== foodId.toString()
    );

    await user.save();

    return res.status(200).json({
      message: "Removed from wishlist",
      wishlist: user.wishlist,
    });
  } catch (error) {
    console.error("Error in removeFromWishlist:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};



export const getWishlist = async (req, res) => {
  try {
    const userId = req.user._id;

    const user = await User.findById(userId)
      .populate("wishlist") // populate food details
      .select("wishlist");

    return res.status(200).json(user.wishlist);
  } catch (error) {
    console.error("Error in getWishlist:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
