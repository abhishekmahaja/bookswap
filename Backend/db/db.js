import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

let isConnected = false;

const connectToDatabase = async () => {
  if (isConnected) return;

  if (!process.env.MONGODB_URL) {
    throw new Error("MONGODB_URL is not defined in environment variables.");
  }

  try {
    const db = await mongoose.connect(process.env.MONGODB_URL);
    isConnected = db.connections[0].readyState === 1;
    console.log(" MongoDB connected.");
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    throw error;
  }
};

export default connectToDatabase;
