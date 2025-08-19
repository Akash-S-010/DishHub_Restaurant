import User from "../models/User.js";
import Food from "../models/Food.js";


// Add item to cart
export const addToCart = async (req, res) => {
  try {
    const userId = req.user._id;
    const { foodId, quantity } = req.body;

    if (!foodId || !quantity || quantity < 1) {
      return res.status(400).json({ message: "Food ID and valid quantity are required" });
    }

    const food = await Food.findById(foodId);
    if (!food) {
      return res.status(404).json({ message: "Food not found" });
    }

    const user = await User.findById(userId);

    // Check if item already in cart
    const existingItem = user.cart.find(
      (item) => item.food.toString() === foodId
    );

    if (existingItem) {
      existingItem.quantity += quantity; // update quantity
    } else {
      user.cart.push({ food: foodId, quantity });
    }

    await user.save();

    return res.status(200).json({
      message: "Item added to cart",
      cart: user.cart,
    });
  } catch (error) {
    console.error("Error in addToCart:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};



// Get user cart
export const getCart = async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .populate("cart.food", "name price image");

    return res.status(200).json(user.cart);
  } catch (error) {
    console.error("Error in getCart:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};



// Update cart item quantity
export const updateCartItem = async (req, res) => {
  try {
    const { foodId, quantity } = req.body;
    if (!foodId || quantity < 1) {
      return res.status(400).json({ message: "Food ID and valid quantity required" });
    }

    const user = await User.findById(req.user._id);
    const cartItem = user.cart.find((item) => item.food.toString() === foodId);

    if (!cartItem) {
      return res.status(404).json({ message: "Item not found in cart" });
    }

    cartItem.quantity = quantity;
    await user.save();

    return res.status(200).json({
      message: "Cart item updated",
      cart: user.cart,
    });
  } catch (error) {
    console.error("Error in updateCartItem:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};



// Remove item from cart
export const removeFromCart = async (req, res) => {
  try {
    const { foodId } = req.params;

    const user = await User.findById(req.user._id);
    user.cart = user.cart.filter((item) => item.food.toString() !== foodId);

    await user.save();

    return res.status(200).json({
      message: "Item removed from cart",
      cart: user.cart,
    });
  } catch (error) {
    console.error("Error in removeFromCart:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};



// Clear cart after order placed (or manually)
export const clearCart = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    user.cart = [];
    await user.save();

    return res.status(200).json({ message: "Cart cleared" });
  } catch (error) {
    console.error("Error in clearCart:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
