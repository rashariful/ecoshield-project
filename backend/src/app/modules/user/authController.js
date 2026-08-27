import { JwtHelpers } from "../../utils/jwtHelpers.js";
import { AuthService } from "./authService.js";
import { User } from "./user.model.js";

// Register user
const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const { user, token } = await AuthService.registerUser(name, email, password, role);
    res.status(201).json({ user, token });
  } catch (error) {
    res.status(400).json({ message: error.message || "Registration failed" });
  }
};

// Login user
// const login = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const { user, token } = await AuthService.loginUser(email, password);

//     const userSafe = user.toObject(); // ডাটা কপি হলো
//     delete userSafe.password;         // শুধু রেসপন্সে দেখানো বন্ধ

//     res.status(200).json({
//       success: true,
//       message: "Login successful",
//       user: userSafe,
//       token,
//     });
//   } catch (error) {
//     res.status(400).json({ message: error.message || "Login failed" });
//   }
// };

// new user login system implement by sharif
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const data = await AuthService.loginUser(email, password, res);
    res.status(200).json({
      success: true,
      message: "Login successful",
      data: {
        accessToken: data.accessToken,
      },
      //  accessToken: data.accessToken
    });
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
};

const refreshToken = async (req, res) => {
  const token = req.cookies.refreshToken;

  if (!token) return res.status(401).json({ message: "No refresh token found" });

  try {
    const decoded = JwtHelpers.generateRefreshToken(token);
    const user = await User.findById(decoded.id);
    if (!user) return res.status(401).json({ message: "User not found" });

    const accessToken = JwtHelpers.generateAccessToken(user);
    res.status(200).json({ accessToken });
  } catch (error) {
    res.status(403).json({ message: "Invalid or expired refresh token" });
  }
};

const getMe = (req, res) => {
  res.status(200).json(req.user); // middleware থেকে পাওয়া user
};

export const AuthController = {
  register,
  login,
  refreshToken,
  getMe,
};

// const asyncHandler = require("express-async-handler");
// const { registerUser } = require("../services/authService");

// // Register user
// const register = asyncHandler(async (req, res) => {
//   const { name, email, password, role } = req.body; // Expect role as a string (e.g., "admin")
//   const { user, token } = await registerUser(name, email, password, role);
//   res.status(201).json({ user, token });
// });

// module.exports = { register };
