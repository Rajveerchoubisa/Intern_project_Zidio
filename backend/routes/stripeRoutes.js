// server/routes/stripe.js
import dotenv from 'dotenv';
dotenv.config();

import express from 'express'

import Stripe from 'stripe'
const router = express.Router();


console.log('Stripe Key:', process.env.STRIPE_SECRET_KEY);

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

router.post("/create-checkout-session", async (req, res) => {
  const { cartItems } = req.body;
  console.log("Received cartItems:", cartItems); // ✅ Debug log

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: cartItems.map(item => ({
        price_data: {
          currency: "inr",
          product_data: {
            name: item.title,
            images: [item.image],
          },
          unit_amount: item.price * 100, // ✅ Don't do .replace
        },
        quantity: item.quantity, // ✅ Use actual quantity
      })),
      success_url: "http://localhost:5173/success",
      cancel_url: "http://localhost:5173/cancel",
    });

    res.json({ url: session.url });
  } catch (err) {
    console.error("Stripe session error:", err); // 
    res.status(500).json({ error: err.message });
  }
});
export default router;