import jwt from "jsonwebtoken";
import User from "../../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";

//middleware to protect routes
const protect = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decodedToken.user.id).select("-password");
      next();
    } catch (error) {
      console.error("Token authorization failed", error);
      res
        .status(401)
        .json({ message: "Not authorized, token verification failed" });
    }
  } else {
    res.status(401).json({ message: "Not authorized, no token provided" });
  }
});

//middleware to check if user is admin
const admin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(403).json({ message: "Not authorized as an admin" });
  }
};

export { protect, admin };
