import express from "express";
import {
  registerUser,
  loginUser,
  getAllUsers,
  deleteUser,
} from "../controllers/authController.js";
import { protect, admin } from "../middlewares/authMiddleware.js";
import User from "../models/userModels.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/", protect, admin, getAllUsers);
router.delete("/:id", protect, admin, deleteUser);
router.get("/me", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password"); // exclude password
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

router.put("/update-profile", protect, async (req, res) => {
  try {
    const { name, email, avatar } = req.body;

    const user = await User.findById(req.user.id);

    if (user) {
      user.name = name || user.name;
      user.email = email || user.email;
      user.avatar = avatar || user.avatar;
      await user.save();

      res.json({ message: "Profile updated successfully", user });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});
export default router;
