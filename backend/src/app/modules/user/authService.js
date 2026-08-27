// // const User = require("../models/User");
// import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { User } from "./user.model.js";
import { JwtHelpers } from "../../utils/jwtHelpers.js";


// const generateToken = (user) => {
//   return jwt.sign({ id: user._id, email: user.email }, process.env.JWT_ACCESS_SECRET, {
//     expiresIn: "7d",
//   });
// };

const registerUser = async (name, email, password, role) => {
  const userExists = await User.findOne({ email });
  if (userExists) throw new Error("User already exists");

  const user = await User.create({ name, email, password, role });
  return { user, token: JwtHelpers.generateAccessToken(user) };
};

// LOGIN SYSTEM HERE 
const loginUser = async (email, password, res) => {
  const user = await User.findOne({ email });
  if (!user || !(await user.matchPassword(password))) {
    throw new Error("Invalid credentials");
  }

  const accessToken = JwtHelpers.generateAccessToken(user);
  const refreshToken = JwtHelpers.generateRefreshToken(user);

  // Set Refresh Token in HTTP-only Cookie
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "Strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  return { user, accessToken };
};


const getMe = async (id) => {
  return await User.findById(id).select("-password");
};



export const  AuthService = {
  registerUser,
  loginUser,
  getMe
}






// const User = require("../models/User");
// const Role = require("../models/Role");
// const jwt = require("jsonwebtoken");

// const generateToken = (user) => {
//   return jwt.sign(
//     { id: user._id, email: user.email, role: user.role },
//     process.env.JWT_SECRET,
//     {
//       expiresIn: "7d",
//     }
//   );
// };

// const registerUser = async (name, email, password, roleName) => {
//   const userExists = await User.findOne({ email });
//   if (userExists) throw new Error("User already exists");

//   const role = await Role.findOne({ name: roleName });
//   if (!role) throw new Error("Invalid role");

//   const user = await User.create({ name, email, password, role: role._id });
//   return { user, token: generateToken(user) };
// };

// module.exports = { registerUser };
