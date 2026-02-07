const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const validator = require("validator");
const User = require("../models/users");

const resendVerificationEmail = async (req, res) => {
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

    // 🔐 Create a new email verification token
    const emailToken = jwt.sign(
      { email: user.email },
      process.env.EMAIL_SECRET,
      { expiresIn: "15m" },
    );

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const link = `http://localhost:5173/auth/verify-mail/${emailToken}`;

    await transporter.sendMail({
      to: user.email,
      subject: "Verify your email",
      html: `
        <h2>Email Verification</h2>
        <p>Click below to verify your email:</p>
        <a href="${link}">Verify Email</a>
      `,
    });

    res.status(200).json({ message: "Verification email sent successfully" });
  } catch (error) {
    console.error("RESEND EMAIL ERROR 👉", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const verifyEmail = async (req, res) => {
  try {
    const decoded = jwt.verify(req.params.token, process.env.EMAIL_SECRET);

    const user = await User.findOne({ email: decoded.email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.isVerified) {
      return res.json({ message: "Email already verified" });
    }

    user.isVerified = true;
    await user.save();

    // 🔐 Login token
    const jwtToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    console.log(user);
    return res
      .status(200)
      .cookie("token", jwtToken, {
        httpOnly: true,
        secure: true, // true in production
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .json({
        message: "Email verified successfully",
        userName: user.userName,
        email: user.email,
        isVerified: user.isVerified,
      });
  } catch (err) {
    res.status(400).json({ message: "Invalid or expired link" });
  }
};

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

    const user = await User.create({
      userName,
      email,
      password: hashedPassword,
    });

    // 🔐 EMAIL verification token
    const emailToken = jwt.sign(
      { email: user.email },
      process.env.EMAIL_SECRET,
      { expiresIn: "15m" },
    );

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const link = `http://localhost:5173/auth/verify-mail/${emailToken}`;

    await transporter.sendMail({
      to: user.email,
      subject: "Verify your email",
      html: `
        <h2>Email Verification</h2>
        <p>Click below to verify your email:</p>
        <a href="${link}">Verify Email</a>
      `,
    });

    console.log(user);
    console.log("mail sent succesfully...");
    console.log("Signup successful. Check your email to verify.");
    res.status(201).json({
      message: "Signup successful. Check your email to verify.",
    });
  } catch (error) {
    console.log("REGISTER ERROR 👉", error);
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

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
      return res.status(400).json({ message: "Inavalid password... " });
    }

    const jwtToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    return res
      .status(200)
      .cookie("token", jwtToken, {
        httpOnly: true, // JS can't access (secure)
        secure: true, // true in production (HTTPS)
        sameSite: "lax", // or "none" if cross-site
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      })
      .json({
        jwtToken,
        message: "user login successfully... ",
        user_details: { _id: user._id, name: user.email },
      });
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ message: "Internal server error ...", error: error.message });
  }
};

const logout = (req, res) => {
  return res
    .clearCookie("token", {
      httpOnly: true,
      secure: true, // true in production (HTTPS)
      sameSite: "lax",
    })
    .status(200)
    .json({
      message: "User logged out successfully",
    });
};

const isLogged = async (req, res) => {
  const token = req.cookies.token; // httpOnly cookie

  if (!token) {
    return res.status(401).json({ authenticated: false });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ _id: decoded.id });

    res.json({
      authenticated: true,
      user: user,
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
  verifyEmail,
  resendVerificationEmail,
};
