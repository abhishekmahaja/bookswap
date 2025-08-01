// import express from "express";
// import mongoose from "mongoose";
// import http from "http";
// import cors from "cors";
// import dotenv from "dotenv";
// import authRoutes from "./routes/authRoutes.js";
// import bookRoutes from "./routes/bookRoutes.js";
// import { connectDB } from "./dbConnection/db.js";

// dotenv.config();

// const PORT = process.env.PORT || 6300;

// const app = express();
// app.use(cors());
// app.use(express.json());

// app.use("/api/v1/auth", authRoutes);
// app.use("/api/v1/books", bookRoutes);

// const server = http.createServer(app);

// const startServer = async () => {
//   await connectDB();

//   server.listen(PORT, () => {
//     console.log(` Server is running on ${PORT}`);
//   });
// };

// startServer();


import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import bookRoutes from "./routes/bookRoutes.js";
import { connectDB } from "./dbConnection/db.js";

dotenv.config();

const app = express();

const corsOptions = {
  origin: ["https://bookswap-ten.vercel.app", "http://localhost:6300"], 
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  credentials: true
};
app.use(cors(corsOptions));
app.use(express.json());

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/books", bookRoutes);

// Connect to DB only once
let isConnected = false;

const handler = async (req, res) => {
  if (!isConnected) {
    await connectDB();
    isConnected = true;
  }

  // Let express handle the request
  return app(req, res);
};

export default handler;
