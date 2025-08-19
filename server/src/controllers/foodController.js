import Food from "../models/Food.js";

// Add a new food item
export const createFood = async (req, res) => {
    try {
        const { name, category, price, description, image, stockAvailable } = req.body;
        const food = await Food.create({ name, category, price, description, image, stockAvailable });
        return res.status(201).json({ message: "food created successfully", food });
    } catch (error) {
        console.error("Error in createFood:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};


// update a food
export const updateFood = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, category, price, description, image, stockAvailable } = req.body;

        const food = await Food.findByIdAndUpdate(id, { name, category, price, description, image, stockAvailable }, { new: true });

        if (!food) {
            return res.status(404).json({ message: "Food not found" });
        }

        return res.status(200).json({ message: "Food updated successfully", food });
    } catch (error) {
        console.error("Error in updateFood:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};


// Delete a food 
export const deleteFood = async (req, res) => {
    try {
        const { id } = req.params;

        const food = await Food.findByIdAndDelete(id);

        if (!food) {
            return res.status(404).json({ message: "Food not found" });
        }

        return res.status(200).json({ message: "Food deleted successfully" });
    } catch (error) {
        console.error("Error in deleteFood:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};


// get all food items
export const getAllFood = async (req, res) => {
    try {
        const { category, sort } = req.query;
        let query = {};
        if (category) query.category = category;

        let foodQuery = Food.find(query).select("-reviews");
        if (sort) foodQuery = foodQuery.sort({ [sort]: 1 }); // e.g., ?sort=price

        const food = await foodQuery;
        return res.status(200).json(food);
    } catch (error) {
        console.error("Error in getAllFood:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};


// Get food by ID
export const getFoodById = async (req, res) => {
  try {
    const food = await Food.findById(req.params.id);
    if (!food) return res.status(404).json({ message: "food not found" });

     if (food.reviews?.length) {
      food.reviews.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }
    return res.status(200).json(food);
  } catch (error) {
    console.error("Error in getFoodById:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};


// add a review to food
export const addReview = async (req, res) => {
  try {
    const foodId = req.params.id;
    const { rating, comment } = req.body;
    const userId = req.user.id;

    // ✅ Validate input
    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({ message: "Rating must be between 1 and 5" });
    }

    // ✅ Find food
    const food = await Food.findById(foodId);
    if (!food) {
      return res.status(404).json({ message: "Food not found" });
    }

    // ✅ Check if user already reviewed this food
    const alreadyReviewed = food.reviews.find(
      (rev) => rev.user.toString() === userId.toString()
    );

    if (alreadyReviewed) {
      return res.status(400).json({ message: "You have already reviewed this food" });
    }

    // ✅ Create new review
    const newReview = {
      user: userId,
      rating: Number(rating),
      comment: comment?.trim() || "" // trim spaces if comment provided
    };

    food.reviews.push(newReview);

    // ✅ Update avgRating
    food.avgRating =
      food.reviews.reduce((acc, item) => acc + item.rating, 0) / food.reviews.length;

    await food.save();

    return res.status(201).json({
      message: "Review added successfully",
      reviews: food.reviews,
      avgRating: food.avgRating.toFixed(1) // keep avg rating to 1 
    });

  } catch (error) {
    console.error("Error in addReview:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
