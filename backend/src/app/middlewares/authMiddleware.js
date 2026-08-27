import jwt from "jsonwebtoken";
// import { User } from "../models/User.js";
// import { Role } from "../models/Role.js";
// import { Permission } from "../models/Permission.js";

import { User } from "../modules/user/user.model.js";

// middleware/verifyToken.js
export const verifyToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);

    // optional: attach user info to request
    req.user = await User.findById(decoded.id).select("-password");

    next(); // go to next middleware or controller
  } catch (error) {
    res.status(401).json({ message: "Invalid or expired token" });
  }
};

// Check if user has a specific role
// export const checkPermission = async (req, res, next) => {
//   try {
//     if (!req.user?.role) {
//       return res
//         .status(403)
//         .json({ success: false, message: "Access denied. No role assigned." });
//     }

//     const permission = await Permission.findOne({
//       route: req.path,
//       method: req.method,
//     });

//     if (!permission) {
//       return res.status(403).json({
//         success: false,
//         message: "Permission not found for this route.",
//       });
//     }

//     const hasPermission = req.user.role.permissions.includes(permission._id);

//     if (!hasPermission) {
//       return res.status(403).json({
//         success: false,
//         message: "Access denied. No permission for this action.",
//       });
//     }

//     next();
//   } catch (error) {
//     res
//       .status(500)
//       .json({ success: false, message: "Server error", error: error.message });
//   }
// };

export const verifyRole = (...allowedRoles) => {
  // console.log(req.user)
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ message: "Forbidden: Access denied" });
    }
    next();
  };
};

// Protect route with JWT
// export const verifyToken = async (req, res, next) => {
//   try {
//     const token = req.header("Authorization")?.split(" ")[1];

//     if (!token) {
//       return res
//         .status(401)
//         .json({ success: false, message: "Unauthorized. No token provided." });
//     }

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = await User.findById(decoded.userId).populate("role");

//     if (!req.user) {
//       return res
//         .status(401)
//         .json({ success: false, message: "Unauthorized. User not found." });
//     }

//     next();
//   } catch (error) {
//     res
//       .status(401)
//       .json({ success: false, message: "Invalid token", error: error.message });
//   }
// };

// export const verifyToken = (req, res, next) => {
//   console.log(verifyToken)
//   const authHeader = req.headers.authorization;

//   if (!authHeader || !authHeader.startsWith("Bearer ")) {
//     return res.status(401).json({ message: "Unauthorized: No token provided" });
//   }

//   const token = authHeader.split(" ")[1];

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decoded;
//     next();
//   } catch (error) {
//     return res.status(401).json({ message: "Unauthorized: Invalid token" });
//   }
// };

// const jwt = require("jsonwebtoken");
// const User = require("../models/User");
// const Role = require("../models/Role");
// const asyncHandler = require("express-async-handler");

// Protect route with JWT
// const protect = asyncHandler(async (req, res, next) => {
//   let token = req.headers.authorization?.split(" ")[1];

//   if (!token) {
//     res.status(401);
//     throw new Error("Not authorized, no token");
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = await User.findById(decoded.id).populate("role").select("-password");
//     next();
//   } catch (error) {
//     res.status(401);
//     throw new Error("Not authorized, token failed");
//   }
// });

// Check if user has a specific role
// const authorizeRoles = (...roles) => {
//   return (req, res, next) => {
//     if (!roles.includes(req.user.role.name)) {
//       res.status(403);
//       throw new Error("Not authorized for this action");
//     }
//     next();
//   };
// };

// module.exports = { protect, authorizeRoles };

// import jwt from "jsonwebtoken";
// import { User } from "../models/User.js";

// export const verifyToken = async (req, res, next) => {
//   try {
//     const token = req.header("Authorization")?.split(" ")[1];

//     if (!token) {
//       return res
//         .status(401)
//         .json({ success: false, message: "Unauthorized. No token provided." });
//     }

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = await User.findById(decoded.userId).select("role");

//     if (!req.user) {
//       return res
//         .status(401)
//         .json({ success: false, message: "Unauthorized. User not found." });
//     }

//     next();
//   } catch (error) {
//     res
//       .status(401)
//       .json({ success: false, message: "Invalid token", error: error.message });
//   }
// };

// export const checkRole = (allowedRoles) => (req, res, next) => {
//   if (!req.user || !allowedRoles.includes(req.user.role)) {
//     return res
//       .status(403)
//       .json({
//         success: false,
//         message: "Access denied. Insufficient permissions.",
//       });
//   }
//   next();
// };
