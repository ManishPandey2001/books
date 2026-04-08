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

/**
 * @swagger
 * components:
 *   schemas:
 *     Book:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: 6613c8b3a1234567890abcd1
 *         title:
 *           type: string
 *           example: Atomic Habits
 *         author:
 *           type: string
 *           example: James Clear
 *         category:
 *           type: string
 *           example: Self Help
 *         publishedYear:
 *           type: integer
 *           example: 2018
 *         isbn:
 *           type: string
 *           example: 9780735211292
 *         available:
 *           type: boolean
 *           example: true
 *         borrowedBy:
 *           type: string
 *           example: Manish Pandey
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *     CreateBookInput:
 *       type: object
 *       required:
 *         - title
 *         - author
 *       properties:
 *         title:
 *           type: string
 *           example: Atomic Habits
 *         author:
 *           type: string
 *           example: James Clear
 *         category:
 *           type: string
 *           example: Self Help
 *         publishedYear:
 *           type: integer
 *           example: 2018
 *         isbn:
 *           type: string
 *           example: 9780735211292
 *     UpdateBookInput:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *           example: Deep Work
 *         author:
 *           type: string
 *           example: Cal Newport
 *         category:
 *           type: string
 *           example: Productivity
 *         publishedYear:
 *           type: integer
 *           example: 2016
 *         isbn:
 *           type: string
 *           example: 9781455586691
 *         available:
 *           type: boolean
 *           example: true
 *         borrowedBy:
 *           type: string
 *           example: Manish Pandey
 *     BorrowBookInput:
 *       type: object
 *       properties:
 *         borrowedBy:
 *           type: string
 *           example: Manish Pandey
 *     MessageResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: Book deleted successfully
 */

/**
 * @swagger
 * /api/books:
 *   get:
 *     summary: Get all books
 *     tags: [Books]
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search books by title, author, or category
 *         example: atomic
 *     responses:
 *       200:
 *         description: List of books
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Book'
 *       500:
 *         description: Server error
 */
router.get("/", getBooks);

/**
 * @swagger
 * /api/books:
 *   post:
 *     summary: Create a new book
 *     tags: [Books]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateBookInput'
 *     responses:
 *       201:
 *         description: Book created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       400:
 *         description: Invalid request data
 */
router.post("/", createBook);

/**
 * @swagger
 * /api/books/{id}:
 *   put:
 *     summary: Update a book
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Book ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateBookInput'
 *     responses:
 *       200:
 *         description: Book updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       400:
 *         description: Invalid request data
 *       404:
 *         description: Book not found
 */
router.put("/:id", updateBook);

/**
 * @swagger
 * /api/books/{id}:
 *   delete:
 *     summary: Delete a book
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Book ID
 *     responses:
 *       200:
 *         description: Book deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MessageResponse'
 *       404:
 *         description: Book not found
 *       500:
 *         description: Server error
 */
router.delete("/:id", deleteBook);

/**
 * @swagger
 * /api/books/{id}/borrow:
 *   patch:
 *     summary: Borrow a book
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Book ID
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/BorrowBookInput'
 *     responses:
 *       200:
 *         description: Book borrowed successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       400:
 *         description: Book is already borrowed
 *       404:
 *         description: Book not found
 *       500:
 *         description: Server error
 */
router.patch("/:id/borrow", borrowBook);

/**
 * @swagger
 * /api/books/{id}/return:
 *   patch:
 *     summary: Return a borrowed book
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Book ID
 *     responses:
 *       200:
 *         description: Book returned successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       404:
 *         description: Book not found
 *       500:
 *         description: Server error
 */
router.patch("/:id/return", returnBook);

export default router;
