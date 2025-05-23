import Order from '../models/orderModels.js';
import Cart from '../models/cartModels.js';

export const createOrder = async (req, res) => {
  const { shippingAddress, paymentMethod } = req.body;

  const cart = await Cart.findOne({ user: req.user._id }).populate('items.product');
  if (!cart || cart.items.length === 0) {
    return res.status(400).json({ msg: 'Cart is empty' });
  }

  const orderItems = cart.items.map(item => ({
    product: item.product._id,
    quantity: item.quantity
  }));

  const totalPrice = cart.items.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  const order = new Order({
    user: req.user._id,
    orderItems,
    shippingAddress,
    paymentMethod,
    totalPrice
  });

  await order.save();
  await Cart.findByIdAndDelete(cart._id); // Clear cart after order

  res.status(201).json(order);
};

// export const getMyOrders = async (req, res) => {
//   try {
//     const orders = await Order.find({ user: req.user._id }).populate("orderItems.product");
//     res.json(orders);
//   } catch (error) {
//     res.status(500).json({ msg: "Failed to fetch orders", error: error.message });
//   }
// }

export const getAllOrders = async (req, res) => {
  const orders = await Order.find().populate('user', 'name email');
  res.json(orders);
};

// export const updateOrderStatus = async (req, res) => {
//   const { orderId } = req.params;
//   const { isDelivered } = req.body;

//   const order = await Order.findById(orderId);
//   if (!order) return res.status(404).json({ msg: 'Order not found' });

//   order.isDelivered = isDelivered;
//   if (isDelivered) {
//     order.deliveredAt = Date.now();
//     order.paymentStatus = 'Paid';
//   }

//   await order.save();
//   res.json(order);
// };
export const updateOrderStatus = async (req, res) => {
  const { orderId } = req.params;
  const { status } = req.body;

  const order = await Order.findById(orderId);
  if (!order) return res.status(404).json({ msg: 'Order not found' });

  order.status = status;
  if (status === "Delivered") {
    order.isDelivered = true;
    order.deliveredAt = Date.now();
    order.paymentStatus = "Paid";
  }

  await order.save();
  res.json(order); // ✅ return updated order
};
