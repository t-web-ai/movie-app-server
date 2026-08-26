import mongoose from "mongoose";
import app from "./app";
import env from "./config/env.config";
import logger from "./utils/logger.util";

async function bootstrapApplication() {
	try {
		await mongoose.connect(env.MONGODB_URI);
		logger.info("connected to mongo database");
		app.listen(env.PORT, () => {
			logger.info(`server is running on port ${env.PORT}`);
		});
	} catch (error) {
		logger.info(error);
		process.exit(1);
	}
}

bootstrapApplication();
