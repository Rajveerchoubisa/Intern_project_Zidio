import express from 'express';
import {
  addToWishlist,
  getWishlist,
  removeFromWishlist
} from '../controllers/wishlistController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/', protect, addToWishlist); // Add product
router.get('/', protect, getWishlist);    // View wishlist
router.delete('/:productId', protect, removeFromWishlist); // Remove product

export default router;
