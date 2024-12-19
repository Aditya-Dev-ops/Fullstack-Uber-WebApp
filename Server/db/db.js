import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

export const connectToDb = async () => {
    try {
        const MONGODB_URI = process.env.MONGODB_URI;
        if (!MONGODB_URI) {
            throw new Error('MONGODB_URI is not defined in environment variables');
        }
        
        await mongoose.connect(MONGODB_URI);
        console.log('Connected to MongoDB successfully');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
};

