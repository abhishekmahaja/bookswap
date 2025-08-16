import express from "express";
import { getUserSwapHistory, login, signup } from "../controllers/authController.js";
import { verifyToken } from "../middleware/authJWT.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/get-swaps-history", verifyToken,getUserSwapHistory);

export default router;
