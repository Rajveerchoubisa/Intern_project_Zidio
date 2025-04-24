import express from "express"
import mongoose, { connect } from "mongoose"
import cors from "cors"
import dotenv from "dotenv"
import connectDB from "./config/db.js"
import authRoutes from './routes/authRoutes.js'
import productRoutes from './routes/productRoutes.js';
import cartRoutes from './routes/cartRoutes.js';
import wishlistRoutes from './routes/wishlistRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import stripeRoutes from './routes/stripeRoutes.js'



dotenv.config();

const app = express();
app.use(cors({
    origin: "http://localhost:5173", // your frontend URL
    credentials: true,
  }));
app.use(express.json());

connectDB();



mongoose.connect(process.env.MONGO_URI,{ useNewUrlParser: true})
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log(err));



app.use('/api',stripeRoutes)
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/wishlist', wishlistRoutes);
app.use('/api/orders', orderRoutes);

app.get('/',(req,res) => res.send('Zidio API running'));

app.listen(process.env.PORT || 5000, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
})