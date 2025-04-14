import mongoose, { mongo } from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Mongo connected");
    } catch (error) {
        console.log("MongoDB connection error",error);
        process.exit(1);
    }
};

export default connectDB;