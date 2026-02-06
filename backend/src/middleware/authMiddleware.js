const User = require("../models/users");
const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.json({ message: "invalid jwt token " });
    }
    const user = await User.findById(decoded.id);

    req.user = { id: decoded.id, isAdmin: user.isAdmin };
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};



module.exports = authMiddleware;
