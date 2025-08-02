import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import serverless from "serverless-http";

import authRoutes from "../routes/authRoutes.js";
import bookRoutes from "../routes/bookRoutes.js";
import connectToDatabase from "../db/db.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/books", bookRoutes);

// Connect to MongoDB once
let isDbConnected = false;
const connect = async () => {
  if (!isDbConnected) {
    await connectToDatabase();
    isDbConnected = true;
  }
};

app.use(async (req, res, next) => {
  await connect();
  next();
});

export const handler = serverless(app);
