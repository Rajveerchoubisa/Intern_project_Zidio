import express from "express";
import {
  createCoupon,
  getAllCoupons,
  deleteCoupon,
} from "../controllers/couponController.js";
import { protect, admin } from "../middlewares/authMiddleware.js";
import Coupon from "../models/couponModels.js";

const router = express.Router();

router.get("/",  getAllCoupons);
router.post("/", protect, admin, createCoupon);
router.delete("/:id", protect, admin, deleteCoupon);
router.post("/apply", async (req, res) => {
  const { code } = req.body;
  const coupon = await Coupon.findOne({ code, active: true });

  if (!coupon) {
    return res.status(404).json({ error: "Invalid or expired coupon" });
  }

  res.json({ discount: coupon.discount });
});



export default router;
