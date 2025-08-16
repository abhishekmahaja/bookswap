import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import serverless from "serverless-http";

import authRoutes from "./routes/authRoutes.js";
import bookRoutes from "./routes/bookRoutes.js";
import connectToDatabase from "./db/db.js";

const app = express();
app.use(cors());
app.use(express.json());

// // Connect to DB before handling any request
// app.use(async (req, res, next) => {
//   try {
//     await connectToDatabase();
//     next();
//   } catch (error) {
//     console.error("Database connection failed:", error.message);
//     return res.status(500).json({ error: "Database connection error" });
//   }
// });

// // API routes
// app.use("/api/v1/auth", authRoutes);
// app.use("/api/v1/books", bookRoutes);

// API routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/books", bookRoutes);

// Local server (for development)
if (process.env.VERCEL !== "1") {
  const startServer = async () => {
    try {
      await connectToDatabase();
      const PORT = process.env.PORT || 6300;
      app.listen(PORT, () => {
        console.log(`🚀 Local server running at http://localhost:${PORT}`);
      });
    } catch (error) {
      console.error("❌ Failed to start local server:", error.message);
    }
  };

  startServer();
}


// Export for Vercel
export const handler = serverless(app);
