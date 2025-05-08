import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  orderItems: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
      quantity: { type: Number, required: true },
      
    }
  ],
  status: { type: String, enum: ["Pending", "Shipped", "Delivered"], default: "Pending" },
  sessionId: {
    type: String,
    required: true,
    unique: true, 
  },
  shippingAddress:{
    fullName: { type: String},
    address: { type: String},
    city: { type: String},
    postalCode: { type: String},
    country: { type: String}
  },
  paymentMethod: { type: String, required: true },
  paymentStatus: { type: String, default: 'Pending' },
  isDelivered: { type: Boolean, default: false },
  deliveredAt: { type: Date },
  totalPrice: { type: Number, required: true }
}, { timestamps: true });

export default mongoose.model('Order', orderSchema);
