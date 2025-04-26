import express from 'express';
import {
  createOrder,
  getMyOrders,
  getAllOrders,
  updateOrderStatus
} from '../controllers/orderController.js';
import { protect, admin } from '../middlewares/authMiddleware.js';
import Order from '../models/orderModels.js'

const router = express.Router();

router.post('/', protect, createOrder); // User places order
router.get('/my-orders', protect, getMyOrders); // View own orders
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

export default router;
