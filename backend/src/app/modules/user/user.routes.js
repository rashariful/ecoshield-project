import express from "express"
import { AuthController } from "./authController.js";
import { verifyToken } from "../../middlewares/authMiddleware.js";
// import { verifyToken } from "../../middlewares/authMiddleware.js";


const router = express.Router();

router.get("/me", verifyToken, AuthController.getMe);
router.post("/register", AuthController.register);
router.post("/login", AuthController.login);
router.post("/refresh-token", AuthController.refreshToken);
// router.get('/profile', verifyToken, async (req, res) => {
//     // এখন req.user থেকে ইউজার আইডি পাওয়া যাবে
//     req.user = req.user._id; // Assuming req.user is populated with user data
//     console.log(req.user); // Log the user ID for debugging
//     res.json({ message: "Welcome!", user: req.user });
//   });
// Protected Route Example
// router.get('/profile', verifyToken, (req, res) => {
//     res.json({ message: "Protected Profile", user: req.user });
//   });

export const AuthRoutes = router;











// import express from "express";
// import { updateUserRole, getUsers } from "../controllers/userController.js";
// import { verifyToken } from "../middlewares/authMiddleware.js";
// import { checkRole } from "../middlewares/authMiddleware.js";

// const router = express.Router();

// // Only "admin" can update roles
// router.put("/update-role", verifyToken, checkRole(["admin"]), updateUserRole);

// // Only "admin" and "inventory_manager" can view all users
// router.get("/all-users", verifyToken, checkRole(["admin", "inventory_manager"]), getUsers);

// export const UserRoute = router
