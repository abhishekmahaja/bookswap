import express from "express";
import reviewModel from "../models/reviewModel.js";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

export const submitReview = async (req, res) => {
  try {
    const { bookId, rating, comment } = req.body;
    const reviewerId = req.user.id;

    const review = await reviewModel.create({
      bookId,
      reviewerId,
      rating,
      comment,
    });

    return res.status(200).json({
      success: true,
      message: "Review submitted",
      data: review,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getBookReviews = async (req, res) => {
  try {
    const reviews = await reviewModel
      .find({ bookId: req.params.id })
      .populate("reviewerId", "name")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      data: reviews,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export default router;
