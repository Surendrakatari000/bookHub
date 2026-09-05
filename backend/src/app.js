const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const authRoutes = require("./routes/authRoutes");
const bookRoutes = require("./routes/bookRoutes");
const globalRoute = require("./routes/globalBooks");
const adminRoutes = require("./routes/adminRoutes");

const authMiddleware = require("./middleware/authMiddleware");
const isAdmin = require("./middleware/isAdminMiddleware");

const app = express();
const allowedOrigins = ["http://localhost:5173", process.env.CLIENT_URL].filter(
  Boolean,
);

app.set("trust proxy", 1);

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

// 🔓 Public routes
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

app.use("/auth", authRoutes);

// 🔐 Protected routes
app.use("/user-books", authMiddleware, bookRoutes);
app.use("/global", authMiddleware, globalRoute);
app.use("/admin", authMiddleware, isAdmin, adminRoutes);

module.exports = app;
