import mongoose from "mongoose";

// database connection
const connectDB = async () => {
    await mongoose.connect(process.env.MONGODB_DB);
    console.log('successfully connected to database');
}

export default connectDB;