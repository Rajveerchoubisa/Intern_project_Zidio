import express from 'express';
import {
  addToCart,
  getCart,
  updateCartItem,
  removeCartItem,
  clearCart
} from '../controllers/cartController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/', protect, addToCart); // Add item to cart
router.get('/', protect, getCart); // View cart
router.put('/:productId', protect, updateCartItem); // Update quantity
router.delete('/:productId', protect, removeCartItem); // Remove specific product
router.delete('/', protect, clearCart); // Clear full cart

export default router;
