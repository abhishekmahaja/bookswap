import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import serverless from "serverless-http";

import connectToDatabase from "../db/db.js";
import authRoutes from "../routes/authRoutes.js";
import bookRoutes from "../routes/bookRoutes.js";

const app = express();
app.use(cors());
app.use(express.json());

// Connect to DB before handling any request
app.use(async (req, res, next) => {
  try {
    await connectToDatabase();
    next();
  } catch (error) {
    console.error("Database connection failed:", error.message);
    return res.status(500).json({ error: "Database connection error" });
  }
});

// API routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/books", bookRoutes);

// Export for Vercel
export const handler = serverless(app);
