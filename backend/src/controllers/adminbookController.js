const Book = require("../models/books");

const addGlobalBook = async (req, res) => {
  try {
    const { title, authorName } = req.body;

    const existingBook = await Book.findOne({
      title: title.trim(),
      authorName: authorName.trim(),
    });

    if (existingBook) {
      return res.status(409).json({
        message: "Book already exists",
        book: existingBook,
      });
    }
    const savedBook = await Book.create(req.body);

    res.status(201).json({
      message: "Book added successfully",
      book: savedBook,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

const updateBook = async (req, res) => {
  try {
    const { bookId } = req.params;

    delete req.body._id;

    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({
        message: "No update data provided",
      });
    }

    const existingBook = await Book.findById(bookId);

    if (!existingBook) {
      return res.status(404).json({ message: "Book not found" });
    }

    // Check if data is actually changing
    const isSameData = Object.keys(req.body).every(
      (key) => req.body[key] === existingBook[key],
    );

    if (isSameData) {
      return res.status(200).json({
        message: "No changes detected",
        book: existingBook,
      });
    }

    const updatedBook = await Book.findByIdAndUpdate(bookId, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedBook) {
      return res.status(404).json({
        message: "Book not found",
      });
    }

    res.status(200).json({
      message: "Book updated successfully",
      book: updatedBook,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteBook = async (req, res) => {
  try {
    const { bookId } = req.params;

    const deletedBook = await Book.findByIdAndDelete(bookId);

    if (!deletedBook) {
      return res.status(404).json({
        message: "Book not found",
      });
    }

    res.status(200).json({
      message: "Book deleted successfully",
      book: deletedBook,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { addGlobalBook, updateBook, deleteBook };
