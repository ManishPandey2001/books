import Book from "../Model/Book.js";

export const getBooks = async (req, res) => {
  try {
    const search = req.query.search || "";

    const books = await Book.find({
      $or: [
        { title: { $regex: search, $options: "i" } },
        { author: { $regex: search, $options: "i" } },
        { category: { $regex: search, $options: "i" } },
      ],
    }).sort({ createdAt: -1 });

    res.json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const createBook = async (req, res) => {
  try {
    const book = await Book.create(req.body);
    res.status(201).json(book);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
export const updateBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.json(book);
    } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
export const deleteBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.json({ message: "Book deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const borrowBook = async (req, res) => {
  try {
    const { borrowedBy } = req.body;
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    if (!book.available) {
      return res.status(400).json({ message: "Book is already borrowed" });
    }

    book.available = false;
    book.borrowedBy = borrowedBy || "Unknown User";
    await book.save();

    res.json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const returnBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    book.available = true;
    book.borrowedBy = "";
    await book.save();

    res.json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};