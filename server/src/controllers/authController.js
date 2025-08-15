import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import generateToken from '../utils/Token.js';

// Common cookie settings
const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict",
  maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
};

// Signup user------
export const signupUser = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    // Validate required fields
    if (!name || !email || !phone || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Validate phone (India specific: starts with 6-9 and is 10 digits)
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(phone)) {
      return res.status(400).json({ message: "Please enter a valid 10-digit mobile number" });
    }

    // Check if email already exists
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ message: "Email is already registered" });
    }

    // Check if phone already exists
    const existingPhone = await User.findOne({ phone });
    if (existingPhone) {
      return res.status(400).json({ message: "Phone number is already registered" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      name,
      email,
      phone,
      password: hashedPassword
    });

    // Generate token using ID & role
    const token = generateToken(user._id, user.role);

    // Set token cookie
    res.cookie("token", token, cookieOptions);

    // Send success response
    return res.status(201).json({
      message: "Signup successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role
      }
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

    // Validate fields
    if (!login || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Determine if login is email or phone
    const isEmail = /\S+@\S+\.\S+/.test(login);
    const query = isEmail ? { email: login } : { phone: login };
    const user = await User.findOne(query);

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate token
    const token = generateToken(user._id, user.role);

    // 5. Set cookie
    res.cookie("token", token, cookieOptions);

    // Send success response
    return res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role
      }
    });

  } catch (error) {
    console.error("Error in loginUser:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
