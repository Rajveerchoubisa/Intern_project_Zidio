import express from "express";
import {registerUser,loginUser,getAllUsers,deleteUser} from "../controllers/authController.js"
import { protect,admin } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get('/', protect, admin, getAllUsers);
router.delete('/:id', protect, admin, deleteUser);

export default router;
