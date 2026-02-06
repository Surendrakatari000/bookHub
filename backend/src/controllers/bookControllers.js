const User_Book = require("../models/user_books");
const Book = require("../models/books");

const addBook = async (req, res) => {
  try {
    const { bookId, status } = req.body;

    if (!bookId) {
      return res.status(400).json({ message: "bookId is required" });
    }

    // ✅ FIXED model name
    const existingBook = await User_Book.findOne({
      userId: req.user.id,
      bookId,
    });

    if (existingBook) {
      return res.status(409).json({
        message: "Book already added to your library",
      });
    }

    const book = await User_Book.create({
      userId: req.user.id,
      bookId,
      status,
    });

    return res.status(201).json(book);
  } catch (error) {
    console.error(error);

    // ✅ Handle duplicate index safety
    if (error.code === 11000) {
      return res.status(409).json({
        message: "Book already added to your library",
      });
    }

    return res.status(500).json({
      message: "Failed to add book. Internal server error",
    });
  }
};

const updateBookStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const statusList = ["want_to_read", "current_reading", "completed"];

    if (!statusList.includes(status)) {
      return res.status(400).json({ message: "invalid status... " });
    }

    const book = await User_Book.findOneAndUpdate(
      { bookId: req.params.id, userId: req.user.id },
      { status },
      { new: true },
    );

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.status(200).json(book);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update book status" });
  }
};

const getUserBooks = async (req, res) => {
  try {
    const { status } = req.query;

    const filter = {
      userId: req.user.id,
    };

    if (status) {
      const allowedStatus = ["want_to_read", "current_reading", "completed"];

      if (!allowedStatus.includes(status)) {
        return res.status(400).json({ message: "Invalid query" });
      }

      filter.status = status;
    }

    const userBooks = await User_Book.find(filter).populate({
      path: "bookId",
      model: "Book",
      select: "_id title authorName rating coverPic",
    });

    const result = userBooks.map((item) => ({
      status: item.status,
      book: item.bookId, // populated global book
    }));

    res.status(200).json({
      count: result.length,
      books: result,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const detailBook = async (req, res) => {
  try {
    const { id } = req.params;

    // 1. Get global book (must exist)
    const globalBook = await Book.findById(id);
    if (!globalBook) {
      return res.status(404).json({ message: "Book not found" });
    }

    // 2. Get user-specific book (optional)
    const userBook = await User_Book.findOne({
      bookId: id,
      userId: req.user.id,
    });

    if (!userBook) {
      return res.status(200).json({
        book: globalBook,
        statusOfBook: "not user book",
      });
    }

    return res.status(200).json({
      book: globalBook,
      statusOfBook: userBook.status,
    });

    // 4. If user book does NOT exist, send only global book
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const removeUserBook = async (req, res) => {
  try {
    const { id } = req.params; // bookId
    const userId = req.user.id; // from auth middleware

    const deletedBook = await User_Book.findOneAndDelete({
      bookId: id,
      userId: userId,
    });

    if (!deletedBook) {
      return res.status(404).json({ message: "Book not found for this user" });
    }

    res.status(200).json({
      message: "Book removed successfully",
      data: deletedBook,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to remove book" });
  }
};

module.exports = {
  addBook,
  updateBookStatus,
  getUserBooks,
  detailBook,
  removeUserBook,
};
