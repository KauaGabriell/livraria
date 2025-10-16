import http from 'http';
import app from './app/app.js';
import { connectDB, disconnectDB } from './config/database.js';

const PORT = process.env.PORT || 4000;

const server = http.createServer(app);

// Conectar ao banco
connectDB();

// Graceful Shutdown
const shutdown = async () => {
	console.log('🛑 Shutting down server...');
	
	server.close(async () => {
		console.log('✅ HTTP server closed');
		await disconnectDB();
		process.exit(0);
	});

	// Forçar shutdown após 10s
	setTimeout(() => {
		console.error('⚠️  Forcing shutdown');
		process.exit(1);
	}, 10000);
};

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);

server.listen(PORT, () => {
	console.log(`🚀 Server running on http://localhost:${PORT}`);
});