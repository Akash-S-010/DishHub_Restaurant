import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import generateToken from '../utils/token.js';

// Common cookie settings
const cookieOptions = {
  httpOnly: true, 
  secure: process.env.NODE_ENV === "production" ? true : false, 
  sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
};

// Signup user------
export const signupUser = async (req, res) => {
  try {
    const { name, email, phone, password, role } = req.body;

    if (!name || !email || !phone || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(phone)) {
      return res.status(400).json({ message: "Please enter a valid 10-digit mobile number" });
    }

    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ message: "Email is already registered" });
    }

    const existingPhone = await User.findOne({ phone });
    if (existingPhone) {
      return res.status(400).json({ message: "Phone number is already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      phone,
      password: hashedPassword,
      role: role || "user",
    });

    const token = generateToken(user.id, user.role);

    res.cookie("token", token, cookieOptions);

    return res.status(201).json({
      message: "Signup successful",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role, // ✅ fixed
      },
    });
  } catch (error) {
    console.error("Error in signupUser:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};




// Login user------
export const loginUser = async (req, res) => {
  try {
    const { login, password } = req.body;

    if (!login || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const isEmail = /\S+@\S+\.\S+/.test(login);
    const query = isEmail ? { email: login } : { phone: login };
    const user = await User.findOne(query);

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    if (user.isBlocked) {
      return res.status(403).json({ message: "User is blocked" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = generateToken(user.id, user.role);

    res.cookie("token", token, cookieOptions);

    return res.status(200).json({
      message: "Login successful",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Error in loginUser:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};



// get user------
export const getUser = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json(user);
  } catch (error) {
    console.error("Error in getUser:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};


// update profile------T
export const updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { name, email, phone, password } = req.body;

    const updates = {};

    // Update name if provided
    if (name) updates.name = name;

    // Update email if provided
    if (email) {
      const existingEmail = await User.findOne({ email, id: { $ne: userId } });
      if (existingEmail) {
        return res.status(400).json({ message: "Email already registered" });
      }
      updates.email = email;
    }

    // Update phone if provided
    if (phone) {
      const phoneRegex = /^[6-9]\d{9}$/;
      if (!phoneRegex.test(phone)) {
        return res.status(400).json({ message: "Please enter a valid 10-digit mobile number" });
      }
      const existingPhone = await User.findOne({ phone, id: { $ne: userId } });
      if (existingPhone) {
        return res.status(400).json({ message: "Phone number already registered" });
      }
      updates.phone = phone;
    }

    // Update password if provided
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      updates.password = hashedPassword;
    }

    // Update user in DB
    const updatedUser = await User.findByIdAndUpdate(userId, updates, { new: true }).select("-password");

    return res.status(200).json({
      message: "Profile updated successfully",
      user: updatedUser
    });

  } catch (error) {
    console.error("Error in updateProfile:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};


// logout user------
export const logoutUser = (req, res) => {
  try {
    // Clear the token cookie
    res.cookie("token", "", { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "strict", maxAge: 0 });
    
    return res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.error("Error in logoutUser:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};



// get all users------
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find()
      .select("-password")
      .sort({ createdAt: -1 }); // newest first

    return res.status(200).json(users);
  } catch (error) {
    console.error("Error in getAllUsers:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};



// Block user------
export const toggleBlockUser = async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Toggle block status
    user.isBlocked = !user.isBlocked;
    await user.save();

    return res.status(200).json({
      message: user.isBlocked ? "Blocked successfully" : "Unblocked successfully"});

  } catch (error) {
    console.error("Error in toggleBlockUser:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
