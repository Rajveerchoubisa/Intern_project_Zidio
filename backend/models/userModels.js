// 📁 server/models/userModels.js
import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
  fullName: String,
  address: String,
  city: String,
  postalCode: String,
  country: String
});

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    avatar: { type: String },
    role: { type: String, enum: ["customer", "admin"] },
    shippingAddress: addressSchema // ✅ added
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
