import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import authRoutes from "../routes/authRoutes.js";
import bookRoutes from "../routes/bookRoutes.js";
import connectToDatabase from "../db/db.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/books", bookRoutes);

const startServer = async () => {
  try {
    await connectToDatabase();

    const PORT = process.env.PORT || 6300;
    app.listen(PORT, () => {
      console.log(`Local server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start local server:", error.message);
  }
};

startServer();
