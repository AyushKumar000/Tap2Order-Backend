import express from 'express';
import dotenv from 'dotenv';
import connectDB from './src/config/db.js';
import logger from './src/middleware/logger.js';
import authRoute from './src/routes/authRoute.js';
import menuRoute from './src/routes/menuRoute.js';
import vendorRoute from './src/routes/vendorRoute.js';
import cartRoute from './src/routes/cartRoute.js';

dotenv.config();
connectDB();

const app = express();

app.use(express.json());

// Log all requests with method, URL, and status code
app.use((req, res, next) => {
    logger.info(`${req.method} ${req.url}`);
    next();
});

app.use('/api/auth', authRoute);
app.use('/api/menu', menuRoute);
app.use('/api/vendor', vendorRoute);
app.use('/api/cart', cartRoute);

app.use((err, req, res, next) => {
    // Log error details
    logger.error(err.message, err);
    res.status(500).json({ message: 'An error occurred' });
});

export default app;
