// express import
import express from "express";

// middleware imports
import { protect, admin } from "../middleware/authMiddleware.js";

// controller imports
import {
  getUsers,
  deleteUser,
  loginUser,
  registerUser,
  logoutUser,
  getUserById,
  getUserProfile,
  updateUser,
  updateUserProfile,
} from "../controllers/userController.js";

const router = express.Router();

router.route("/").post(registerUser).get(protect, admin, getUsers);
router.post("/logout", logoutUser);
router.post("/login", loginUser);
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);
router
  .route("/:id")
  .delete(protect, admin, deleteUser)
  .get(protect, admin, getUserById)
  .put(protect, admin, updateUser);

export default router;
