import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import User from "../models/userModel.js";
import book from "../models/bookModel.js";

dotenv.config();

const router = express.Router();

export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Enter Required Field",
      });
    }

    // If user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({
        success: false,
        message: "User already Present",
      });
    }

    const hashed = await bcrypt.hash(password, 10);

    //add the user
    const registeredUser = await User.create({ name, email, password: hashed });

    return res.status(200).json({
      success: true,
      message: "User registered Successfully",
      data: { registeredUser },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Enter Required Field",
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};

export const getUserSwapHistory = async (req, res) => {
  try {
    const userId = req.user.id;

    const booksSwapped = await book.find({
      $or: [
        { userId },
        { "requests.userId": userId, "requests.status": "accepted" },
      ],
    }).populate("userId", "name email");

    return res.status(200).json({
      success: true,
      message: "Swap history fetched",
      data: booksSwapped,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export default router;
