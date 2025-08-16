import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    title: {
      type: String,
      unique: true,
    },
    author: {
      type: String,
    },
    condition: {
      type: String,
    },
    image: {
      type: [String],
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
    requests: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        status: {
          type: String,
          enum: ["pending", "accepted", "declined"],
          default: "pending",
        },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Book", bookSchema);
