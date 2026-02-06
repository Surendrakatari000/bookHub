const express = require("express");
const {
  register,
  login,
  logout,
  isLogged,
  verifyEmail,
  resendVerificationEmail
} = require("../controllers/authControllers");

const router = express.Router();

router.post("/signup", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/isloged", isLogged);
router.get("/verify-mail/:token", verifyEmail);
router.post("/resend-email" , resendVerificationEmail);

module.exports = router;
