import express from "express";
import {
  registerUser,
  loginUser,
  getAllUsers,
  deleteUser,
} from "../controllers/authController.js";
import { protect, admin } from "../middlewares/authMiddleware.js";
import User from "../models/userModels.js";
import { updateShippingAddress } from "../controllers/authController.js";



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
    const { name, email, avatar, shippingAddress } = req.body;

    const user = await User.findById(req.user.id);

    if (!user) return res.status(404).json({ message: "User not found" });

    user.name = name || user.name;
    user.email = email || user.email;
    user.avatar = avatar || user.avatar;

    // 👇 Append new address without overwriting existing ones
    if (shippingAddress) {
      user.shippingAddress = user.shippingAddress || [];
      user.shippingAddress.push(shippingAddress);
    }

    await user.save();

    res.json({ message: "Profile updated successfully", user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});


// router.put("/update-address", protect, updateShippingAddress);


router.delete("/delete-address/:index", protect, async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user) return res.status(404).json({ msg: "User not found" });

  user.shippingAddress.splice(req.params.index, 1);
  await user.save();
  res.json({ message: "Address deleted", shippingAddress: user.shippingAddress });
});

export default router;
