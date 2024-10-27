import mongoose from 'mongoose';
import dotenv from 'dotenv';
import logger from '../middleware/logger.js';

dotenv.config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB connected successfully');
        logger.info('MongoDB connected successfully');
    } catch (error) {
        logger.error(logger.error(`MongoDB connection error: ${error.message}`));
        console.error('MongoDB connection error:', error.message);
        process.exit(1);
    }
};

export default connectDB;
