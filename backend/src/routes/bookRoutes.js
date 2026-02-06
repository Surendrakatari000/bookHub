const express = require("express");

const {
  addBook,
  updateBookStatus,
  getUserBooks,
  detailBook,
  removeUserBook
} = require("../controllers/bookControllers");

const router = express.Router();

// router.get("/",getAllUserBook);
router.post("/", addBook);
router.patch("/:id", updateBookStatus);
router.get("/", getUserBooks);
router.get("/:id", detailBook);
router.delete("/:id", removeUserBook) ;

// router.put("/:id", updateBookStatus);

module.exports = router;




