import express from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import Book from "../models/bookModel.js";

dotenv.config();

const router = express.Router();

export const addBooks = async (req, res) => {
  try {
    const { title, author, condition } = req.body;
    if (
      !title ||
      !author ||
      !condition ||
      !req.files ||
      req.files.length === 0
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields including at least one image are required",
      });
    }

    // Check if book already exists
    const bookExists = await Book.findOne({ title });
    if (bookExists) {
      return res.status(400).json({
        success: false,
        message: "Book already Present",
      });
    }

    // image URLs
    const imageUrls = req.files.map(file => file.path);

    // Add the book
    const book = await Book.create({
      userId: req.user.id,
      title,
      author,
      condition,
      image: imageUrls,
    });

    return res.status(200).json({
      success: true,
      message: "Book Added Successfully",
      data: { book },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};

export const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find().populate("userId", "name");
    return res.status(200).json({
      success: true,
      message: "Books fetched successfully",
      data: books,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};

export const requestBook = async (req, res) => {
  try {
    const { id } = req.params;

    const book = await Book.findById(id);
    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

    // Prevent duplicate requests
    const alreadyRequested = book.requests.some(
      (reqObj) => reqObj.userId.toString() === req.user.id
    );
    if (alreadyRequested) {
      return res.status(400).json({
        success: false,
        message: "You have already requested this book",
      });
    }

    book.requests.push({ userId: req.user.id, status: "pending" });
    await book.save();

    return res.status(200).json({
      success: true,
      message: "Book request sent successfully",
      data: book,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};

export const getMyBooks = async (req, res) => {
  try {
    const books = await Book.find({ userId: req.user.id });
    return res.status(200).json({
      success: true,
      message: "Your books fetched successfully",
      data: books,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};

export const updateRequestStatus = async (req, res) => {
  try {
    const { bookId, requestId } = req.params;
    const { status } = req.query;

    if (!status) {
      return res.status(400).json({
        success: false,
        message: "Status is required",
      });
    }

    const book = await Book.findById(bookId);

    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

    // Ensure requests array exists and is an array
    if (!Array.isArray(book.requests)) {
      return res.status(400).json({
        success: false,
        message: "No requests found on this book",
      });
    }

    const request = book.requests.id(requestId); // .id() only works if book.requests is a Mongoose subdocument array

    if (!request) {
      return res.status(404).json({
        success: false,
        message: "Request not found",
      });
    }

    request.status = status;
    await book.save();

    return res.status(200).json({
      success: true,
      message: "Request status updated successfully",
      data: book,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};

export default router;
