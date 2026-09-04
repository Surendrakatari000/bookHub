const authMiddleware = require("../middleware/authMiddleware");
const express = require("express");
const { getSuggestedBooks, getTopRatedBooks } = require("../controllers/globalBookController");

const router = express.Router();

router.get("/books", getSuggestedBooks);
router.get("/top-rated-books", getTopRatedBooks);

module.exports = router;
