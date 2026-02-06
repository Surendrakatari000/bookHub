const {
  addGlobalBook,
  updateBook,
  deleteBook,
} = require("../controllers/adminbookController");

const express = require("express");

const router = express.Router();

router.post("/add-book", addGlobalBook);
router.put("/edit-book/:bookId", updateBook);
router.delete("/delete-book/:bookId", deleteBook);

module.exports = router;
