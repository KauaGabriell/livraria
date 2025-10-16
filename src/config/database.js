import mongoose from 'mongoose';

const MONGO_URI = process.env.MONGO_URI;

// Configurar strictQuery para evitar o warning
mongoose.set('strictQuery', false);

/**
 * Connect to MongoDB with retry logic
 */
const connectDB = async () => {
	try {
		await mongoose.connect(MONGO_URI, {
			// Opções recomendadas (muitas são padrão no Mongoose 6+)
			serverSelectionTimeoutMS: 5000, // Timeout após 5s
		});
		console.log('✅ MongoDB connected successfully');
	} catch (error) {
		console.error('❌ MongoDB connection error:', error.message);
		process.exit(1);
	}
};

/**
 * Graceful shutdown handler
 */
const disconnectDB = async () => {
	try {
		await mongoose.disconnect();
		console.log('✅ MongoDB disconnected');
	} catch (error) {
		console.error('❌ Error disconnecting MongoDB:', error.message);
	}
};

export { connectDB, disconnectDB };