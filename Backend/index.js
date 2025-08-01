import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import bookRoutes from "./routes/bookRoutes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/books", bookRoutes);

export { app };
export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 10000, 
    });
    console.log("MongoDB Connected");
  } catch (err) {
    console.error("MongoDB connection error:", err.message);
    process.exit(1); 
  }
};
