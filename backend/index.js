import express from "express"
import mongoose, { connect } from "mongoose"
import cors from "cors"
import dotenv from "dotenv"
import connectDB from "./config/db.js"

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

connectDB();



mongoose.connect(process.env.MONGO_URI,{ useNewUrlParser: true})
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log(err));

app.use('/api/auth', authRoutes);
app.get('/',(req,res) => res.send('Zidio API running'));

app.listen(process.env.PORT || 5000, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
})