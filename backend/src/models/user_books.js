const mongoose = require("mongoose");

const user_booksSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    bookId: {
      type: String,
      required: true,
      ref: "Book",
    },
    status: {
      type: String,
      enum: ["want_to_read", "current_reading", "completed"],
      default: "want_to_read",
    },
  },
  {
    collection: "user_books",
    timestamps: true,
  }
);

module.exports = mongoose.model("User_Book", user_booksSchema);
