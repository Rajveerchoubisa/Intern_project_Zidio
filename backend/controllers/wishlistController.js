import Wishlist from '../models/wishlistModels.js';
import Product from '../models/productModels.js';

export const addToWishlist = async (req, res) => {
  const { productId } = req.body;

  const product = await Product.findById(productId);
  if (!product) return res.status(404).json({ msg: 'Product not found' });

  let wishlist = await Wishlist.findOne({ user: req.user._id });
  if (!wishlist) {
    wishlist = new Wishlist({ user: req.user._id, products: [] });
  }

  if (wishlist.products.includes(productId)) {
    return res.status(400).json({ msg: 'Already in wishlist' });
  }

  wishlist.products.push(productId);
  await wishlist.save();
  res.json(wishlist);
};

export const getWishlist = async (req, res) => {
  const wishlist = await Wishlist.findOne({ user: req.user._id }).populate('products');
  if (!wishlist) return res.json({ products: [] });
  res.json(wishlist);
};

export const removeFromWishlist = async (req, res) => {
  const { productId } = req.params;

  const wishlist = await Wishlist.findOne({ user: req.user._id });
  if (!wishlist) return res.status(404).json({ msg: 'Wishlist not found' });

  wishlist.products = wishlist.products.filter(p => p.toString() !== productId);
  await wishlist.save();
  res.json(wishlist);
};
