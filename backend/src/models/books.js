const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const bookSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: uuidv4,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    rating: {
      type: Number,
      min: 0,
      max: 5,
      default: 3,
    },

    authorName: {
      type: String,
      required: true,
      trim: true,
    },

    coverPic: {
      type: String,
      required: true,
    },

    aboutBook: {
      type: String,
      required: true,
    },

    aboutAuthor: {
      type: String,
      required: true,
    },
  },
  {
    collection: "books",
    timestamps: true,
  },
);

module.exports = mongoose.model("Book", bookSchema);
