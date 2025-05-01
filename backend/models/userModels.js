// 📁 server/models/userModels.js
import mongoose from "mongoose";



const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    avatar: { type: String },
    role: { type: String, enum: ["customer", "admin"] },
    shippingAddress:  {
      fullName: String,
      address: String,
      city: String,
      postalCode: String,
      country: String,
    }, 
    // paymentMethod: { type: String, required: true },
    // paymentStatus: { type: String, default: 'Pending' },
    // isDelivered: { type: Boolean, default: false },
    // deliveredAt: Date,
    // totalPrice: { type: Number, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
