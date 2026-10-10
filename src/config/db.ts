import mongoose, { type ConnectOptions, STATES } from "mongoose";
import env from "./env.config";

const CONNECTION_OPTIONS: ConnectOptions = {
	serverSelectionTimeoutMS: 8000,
	socketTimeoutMS: 45000,
	maxPoolSize: 5,
	bufferCommands: false,
};

interface ConnectionCache {
	connection: Promise<typeof mongoose> | null;
}

function createDatabaseConnector() {
	const cache: ConnectionCache = { connection: null };

	return async function connectToDatabase(): Promise<typeof mongoose> {
		const { readyState } = mongoose.connection;

		if (readyState === STATES.connected) return mongoose;

		if (
			readyState === STATES.disconnected ||
			readyState === STATES.disconnecting
		) {
			cache.connection = null;
		}

		cache.connection ??= mongoose
			.connect(env.MONGODB_URI, CONNECTION_OPTIONS)
			.catch((error) => {
				cache.connection = null;
				throw error;
			});

		return cache.connection;
	};
}

export const connectToDatabase = createDatabaseConnector();
