import express from "express";
import {
  getBooks,
  createBook,
  updateBook,
  deleteBook,
  borrowBook,
  returnBook,
} from "../Controllers/bookController.js";

const router = express.Router();

router.get("/", getBooks);
router.post("/", createBook);
router.put("/:id", updateBook);
router.delete("/:id", deleteBook);
router.patch("/:id/borrow", borrowBook);
router.patch("/:id/return", returnBook);

export default router;