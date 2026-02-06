const authMiddleware = require("../middleware/authMiddleware");
const express = require("express");
const getSuggestedBooks = require("../controllers/globalBookController");

const router = express.Router();

router.get("/books", getSuggestedBooks);

module.exports =  router;
