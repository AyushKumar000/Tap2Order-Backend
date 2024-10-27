import app from './app.js';
import dotenv from 'dotenv';
import logger from './src/middleware/logger.js';

dotenv.config();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	console.log("========================================");
	console.log(`=========== ENV: ${process.env.NODE_ENV} ===========`);
	console.log(`🚀 App listening on the port ${process.env.PORT} 🚀`);
	console.log("========================================");    
	logger.info("========================================");
	logger.info(`=========== ENV: ${process.env.NODE_ENV} ===========`);
	logger.info(`🚀 App listening on the port ${process.env.PORT} 🚀`);
	logger.info("========================================");    
})
