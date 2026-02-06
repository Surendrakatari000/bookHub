const Book = require("../models/books");

const getSuggestedBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json({
      count: books.length,
      data: books,
    });
  } catch (error) {
    res.status(500).json({
      message: "internal server error",
      error: error.message,
    });
  }
};

module.exports = getSuggestedBooks;
