import express from "express";
import mongoose from "mongoose";
import http from "http";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import bookRoutes from "./routes/bookRoutes.js";
import { connectDB } from "./dbConnection/db.js";

dotenv.config();

const PORT = process.env.PORT || 6300;

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/books", bookRoutes);

const server = http.createServer(app);

const startServer = async () => {
  await connectDB();

  server.listen(PORT, () => {
    console.log(` Server is running on ${PORT}`);
  });
};

startServer();
