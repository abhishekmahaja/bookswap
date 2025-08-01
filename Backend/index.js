// import express from "express";
// import mongoose from "mongoose";
// import cors from "cors";
// import dotenv from "dotenv";
// import authRoutes from "./routes/authRoutes.js";
// import bookRoutes from "./routes/bookRoutes.js";

// dotenv.config();

// const PORT = process.env.PORT || 6300;

// const app = express();
// app.use(cors());
// app.use(express.json());

// app.use("/api/v1/auth", authRoutes);
// app.use("/api/v1/books", bookRoutes);

// mongoose
//   .connect(process.env.MONGODB_URI, {
//     useNewUrlParser: true,
//     // useUnifiedTopology: true,
//   })
//   .then(() => {
//     console.log("Connected to MongoDB");
//     app.listen(PORT, () => {
//       console.log(`Server running on port ${PORT}`);
//     });
//   })
//   .catch((err) => {
//     console.error("Error connecting to MongoDB:", err);
//     process.exit(1);
//   });


// index.js
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

let isConnected = false;

async function connectDB() {
  if (isConnected) return;
  await mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
  });
  isConnected = true;
}

app.use(async (req, res, next) => {
  await connectDB();
  next();
});

// ✅ IMPORTANT: DO NOT write app.listen()
// Because Vercel doesn't allow it

export default app;
