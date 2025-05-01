import Coupon from "../models/couponModels.js";

export const createCoupon = async (req, res) => {
  try {
    const coupon = await Coupon.create(req.body);
    res.status(201).json(coupon);
  } catch (err) {
    res.status(400).json({ msg: "Failed to create coupon", error: err.message });
  }
};

export const getAllCoupons = async (req, res) => {
  const coupons = await Coupon.find({});
  res.json(coupons);
};

export const deleteCoupon = async (req, res) => {
  await Coupon.findByIdAndDelete(req.params.id);
  res.json({ msg: "Coupon deleted" });
};
