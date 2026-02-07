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
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
  }),
);

app.use("/auth", authRoutes);
app.use("/user-books", authMiddleware, bookRoutes);
app.use("/", authMiddleware, globalRoute);
app.use("/admin", authMiddleware, isAdmin, adminRoutes);

module.exports = app;
