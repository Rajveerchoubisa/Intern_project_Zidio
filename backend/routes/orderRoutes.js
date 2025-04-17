import express from 'express';
import {
  createOrder,
  getMyOrders,
  getAllOrders,
  updateOrderStatus
} from '../controllers/orderController.js';
import { protect, admin } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/', protect, createOrder); // User places order
router.get('/my-orders', protect, getMyOrders); // View own orders
router.get('/', protect, admin, getAllOrders); // Admin gets all orders
router.put('/:orderId', protect, admin, updateOrderStatus); // Admin updates status

export default router;
