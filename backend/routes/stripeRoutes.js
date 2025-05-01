import express from 'express';
import Stripe from 'stripe';
import dotenv from 'dotenv';
import User from '../models/userModels.js'
import Order from '../models/orderModels.js'

dotenv.config();
const router = express.Router();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Create checkout session
router.post("/create-checkout-session", async (req, res) => {
  const { cartItems } = req.body;
  console.log("Received cartItems:", cartItems);

  try {
    const cleanedCartItems = cartItems.map(item => ({
      name: item.name,
      images: item.image,
      quantity: item.quantity || 1,
      price: typeof item.price === 'string' 
        ? parseInt(item.price.replace(/[^\d]/g, ""), 10)  // remove ₹ symbol, parse safely
        : item.price, // already number
    }));

    console.log("🧼 Cleaned Cart Items:", cleanedCartItems);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: cleanedCartItems.map(item => ({
        price_data: {
          currency: "inr",
          product_data: {
            name: item.name,
            images: [item.image],
          },
          unit_amount: item.price * 100, // now safe number
        },
        quantity: item.quantity,
      })),
      success_url: "http://localhost:5173/success?session_id={CHECKOUT_SESSION_ID}",
      cancel_url: "http://localhost:5173/cancel",
      metadata: {
        cart: JSON.stringify(cartItems),
      }
    });

    res.json({ url: session.url });

  } catch (err) {
    console.error("Stripe session error:", err.message);
    res.status(500).json({ error: err.message });
  }
});



// router.get('/session/:id', async (req, res) => {
//   try {
//     const session = await stripe.checkout.sessions.retrieve(req.params.id);
//     const cart = JSON.parse(session.metadata.cart);

//     res.json({
//       cart,
//       total: session.amount_total / 100,
//       sessionId: session.id,
//     });
//   } catch (err) {
//     console.error("Stripe session fetch error:", err.message);
//     res.status(500).json({ error: err.message });
//   }
// });
router.get('/session/:id', async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.retrieve(req.params.id);
    const cart = JSON.parse(session.metadata.cart);

    // ✅ Avoid duplicate orders
    const existingOrder = await Order.findOne({ sessionId: session.id });
    if (existingOrder) {
      return res.json({
        message: "Order already exists",
        cart,
        total: session.amount_total / 100,
        sessionId: session.id,
      });
    }

    const user = await User.findOne({ email: session.customer_details.email });
    if (!user) return res.status(404).json({ error: "User not found" });

    const order = new Order({
      user: user._id,
      orderItems: cart.map(item => ({
        product: item.productId,
        quantity: item.quantity,
      })),
      shippingAddress: user.address,
      paymentMethod: "Online",
      paymentStatus: session.payment_status,
      isDelivered: false,
      totalPrice: session.amount_total / 100,
      sessionId: session.id, // ✅ Store sessionId to avoid duplicates
    });

    await order.save();

    res.json({
      message: "Order created",
      cart,
      total: session.amount_total / 100,
      sessionId: session.id,
    });

  } catch (error) {
    console.error("❌ Order creation failed:", error.message);
    res.status(500).json({ error: error.message });
  }
});



export default router;