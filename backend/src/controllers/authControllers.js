const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const validator = require("validator");
const User = require("../models/users");
const { getOtpEmailHtml } = require("../utils/emailTemplates");

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  maxAge: 7 * 24 * 60 * 60 * 1000,
};

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Generate a 6-digit numeric OTP */
const generateOtp = () =>
  crypto.randomInt(100000, 999999).toString();

/** Create a reusable nodemailer transporter */
const createTransporter = () =>
  nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    family: 4,
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 15000,
  });

/** Send OTP email with branded template */
const sendOtpEmail = async (email, otp, purpose, userName) => {
  const transporter = createTransporter();
  const subject =
    purpose === "verify"
      ? "Verify your email — BookHub"
      : "Reset your password — BookHub";

  await transporter.sendMail({
    to: email,
    subject,
    html: getOtpEmailHtml(otp, purpose, userName),
  });
};

// ---------------------------------------------------------------------------
// Controllers
// ---------------------------------------------------------------------------

/**
 * POST /auth/signup
 * Register a new user and send a verification OTP.
 */
const register = async (req, res) => {
  try {
    const { userName, email, password } = req.body;

    if (!userName || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "Invalid email" });
    }

    const isUserExist = await User.findOne({ email });
    if (isUserExist) {
      return res.status(409).json({ message: "User already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const otp = generateOtp();
    const hashedOtp = await bcrypt.hash(otp, 10);

    const user = await User.create({
      userName,
      email,
      password: hashedPassword,
      otp: hashedOtp,
      otpExpiresAt: new Date(Date.now() + 10 * 60 * 1000), // 10 min
      otpPurpose: "verify",
    });

    // Fire-and-forget email
    sendOtpEmail(email, otp, "verify", userName)
      .then(() => console.log("Verification OTP sent to", email))
      .catch((err) => console.error("Failed to send OTP:", err.message));

    console.log(user);
    console.log("Signup successful. OTP sent.");
    res.status(201).json({
      message: "Signup successful. Please verify your email with the OTP sent.",
      email: user.email,
    });
  } catch (error) {
    console.log("REGISTER ERROR 👉", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

/**
 * POST /auth/verify-otp
 * Verify email using a 6-digit OTP.  Body: { email, otp }
 */
const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({ message: "Email and OTP are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.isVerified) {
      return res.json({ message: "Email already verified" });
    }

    if (!user.otp || !user.otpExpiresAt || user.otpPurpose !== "verify") {
      return res.status(400).json({ message: "No verification OTP found. Please request a new one." });
    }

    if (new Date() > user.otpExpiresAt) {
      return res.status(400).json({ message: "OTP has expired. Please request a new one." });
    }

    const isMatch = await bcrypt.compare(otp, user.otp);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    // Mark verified & clear OTP fields
    user.isVerified = true;
    user.otp = null;
    user.otpExpiresAt = null;
    user.otpPurpose = null;
    await user.save();

    // Issue login token
    const jwtToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    return res.status(200).cookie("token", jwtToken, cookieOptions).json({
      message: "Email verified successfully",
      userName: user.userName,
      email: user.email,
      isVerified: user.isVerified,
    });
  } catch (err) {
    console.error("VERIFY OTP ERROR 👉", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

/**
 * POST /auth/resend-otp
 * Resend a verification OTP. Body: { email }
 */
const resendOtp = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.isVerified) {
      return res.status(400).json({ message: "Email already verified" });
    }

    const otp = generateOtp();
    const hashedOtp = await bcrypt.hash(otp, 10);

    user.otp = hashedOtp;
    user.otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000);
    user.otpPurpose = "verify";
    await user.save();

    await sendOtpEmail(email, otp, "verify", user.userName);

    res.status(200).json({ message: "Verification OTP sent successfully" });
  } catch (error) {
    console.error("RESEND OTP ERROR 👉", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

/**
 * POST /auth/forgot-password
 * Send a password-reset OTP. Body: { email }
 */
const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      // Don't reveal whether the email exists
      return res
        .status(200)
        .json({ message: "If this email is registered, you will receive an OTP." });
    }

    const otp = generateOtp();
    const hashedOtp = await bcrypt.hash(otp, 10);

    user.otp = hashedOtp;
    user.otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000);
    user.otpPurpose = "reset";
    await user.save();

    await sendOtpEmail(email, otp, "reset", user.userName);

    res
      .status(200)
      .json({ message: "If this email is registered, you will receive an OTP." });
  } catch (error) {
    console.error("FORGOT PASSWORD ERROR 👉", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

/**
 * POST /auth/reset-password
 * Reset password after OTP verification. Body: { email, otp, newPassword }
 */
const resetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;

    if (!email || !otp || !newPassword) {
      return res
        .status(400)
        .json({ message: "Email, OTP, and new password are required" });
    }

    if (newPassword.length < 8) {
      return res
        .status(400)
        .json({ message: "Password must be at least 8 characters" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!user.otp || !user.otpExpiresAt || user.otpPurpose !== "reset") {
      return res
        .status(400)
        .json({ message: "No reset OTP found. Please request a new one." });
    }

    if (new Date() > user.otpExpiresAt) {
      return res
        .status(400)
        .json({ message: "OTP has expired. Please request a new one." });
    }

    const isMatch = await bcrypt.compare(otp, user.otp);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    // Update password & clear OTP
    user.password = await bcrypt.hash(newPassword, 10);
    user.otp = null;
    user.otpExpiresAt = null;
    user.otpPurpose = null;
    await user.save();

    res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    console.error("RESET PASSWORD ERROR 👉", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

/**
 * POST /auth/login
 */
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User is not registered..." });
    }

    if (!user.isVerified) {
      return res.status(403).json({
        message: "Please verify your email first",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password..." });
    }

    const jwtToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    return res
      .status(200)
      .cookie("token", jwtToken, cookieOptions)
      .json({
        message: "user login successfully...",
        user_details: {
          _id: user._id,
          name: user.email,
          isAdmin: Boolean(user.isAdmin),
        },
      });
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ message: "Internal server error...", error: error.message });
  }
};

/**
 * POST /auth/logout
 */
const logout = (req, res) => {
  return res.clearCookie("token", cookieOptions).status(200).json({
    message: "User logged out successfully",
  });
};

/**
 * GET /auth/isloged
 */
const isLogged = async (req, res) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ authenticated: false });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ _id: decoded.id });

    res.json({
      authenticated: true,
      user: {
        _id: user._id,
        userName: user.userName,
        email: user.email,
        isAdmin: Boolean(user.isAdmin),
        isVerified: Boolean(user.isVerified),
      },
    });
  } catch (err) {
    res.status(401).json({ authenticated: false });
  }
};

module.exports = {
  register,
  login,
  logout,
  isLogged,
  verifyOtp,
  resendOtp,
  forgotPassword,
  resetPassword,
};
