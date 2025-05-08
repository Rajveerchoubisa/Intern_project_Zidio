import express from 'express';
import {
  createOrder,
  getAllOrders,
  updateOrderStatus
} from '../controllers/orderController.js';
import { protect, admin } from '../middlewares/authMiddleware.js';
import Order from '../models/orderModels.js'

const router = express.Router();

router.post('/', protect, createOrder); // User places order
// router.get('/my-orders', protect, getMyOrders); // View own orders
router.get('/', protect, admin, getAllOrders); // Admin gets all orders
router.put('/:orderId', protect, admin, updateOrderStatus); // Admin updates status

router.post('/', async (req, res) => {
  try {
    const order = await Order.create(req.body);
    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/orders/my-orders
router.get("/my-orders", protect, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).populate({
      path: "user",
      select: "name email shippingAddress" // 👈 include shippingAddress here
    })
    .populate("orderItems.product");
    res.json(orders);
  } catch (error) {
    res.status(500).json({ msg: "Failed to fetch orders", error: error.message });
  }
});


export default router;
