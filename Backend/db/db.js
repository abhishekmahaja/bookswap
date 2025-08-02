import mongoose from "mongoose";

const connectToDatabase = async () => {
  try {
    if (!process.env.MONGODB_URL) {
      throw new Error("MONGODB_URL is not defined");
    }

    await mongoose.connect(process.env.MONGODB_URL);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    throw error;
  }
};

export default connectToDatabase;
