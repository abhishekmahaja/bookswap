import express from "express";
import { verifyToken } from "../middleware/authJWT.js";
import {
  addBooks,
  getAllBooks,
  getMyBooks,
  requestBook,
  toggleAvailability,
  updateRequestStatus,
} from "../controllers/bookController.js";
import upload from "../middleware/upload.js";

const router = express.Router();

router.post("/addBook", verifyToken, upload.array("files", 5), addBooks);
router.get("/getBook", verifyToken, getAllBooks);
router.get("/requestBook/:id", verifyToken, requestBook);
router.get("/getMyBooks", verifyToken, getMyBooks);
router.patch("/:bookId/requests/:requestId", verifyToken, updateRequestStatus);
router.patch("/toggle-availability/:id", verifyToken, toggleAvailability
);

export default router;
