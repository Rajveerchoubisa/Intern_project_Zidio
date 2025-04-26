import express from 'express';
import Stripe from 'stripe';
import dotenv from 'dotenv';

dotenv.config();
const router = express.Router();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Create checkout session
router.post("/create-checkout-session", async (req, res) => {
  const { cartItems } = req.body;
  console.log("Received cartItems:", cartItems);

  try {
    const cleanedCartItems = cartItems.map(item => ({
      title: item.title,
      image: item.image,
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
            name: item.title,
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



router.get('/session/:id', async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.retrieve(req.params.id);
    const cart = JSON.parse(session.metadata.cart);

    res.json({
      cart,
      total: session.amount_total / 100,
      sessionId: session.id,
    });
  } catch (err) {
    console.error("Stripe session fetch error:", err.message);
    res.status(500).json({ error: err.message });
  }
});


export default router;