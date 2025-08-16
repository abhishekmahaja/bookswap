import express from "express";
import {
  getBookReviews,
  submitReview,
} from "../controllers/reviewController.js";
import { verifyToken } from "../middleware/authJWT.js";

const router = express.Router();

router.post("/submit-review", verifyToken, submitReview);
router.get("/get-review/:id", verifyToken, getBookReviews);

export default router;
