import app from "./app";
import { connectToDatabase } from "./config/db";
import env from "./config/env.config";
import logger from "./utils/logger.util";

async function bootstrapApplication() {
	try {
		await connectToDatabase();
		logger.info("connected to mongo database");
		app.listen(env.PORT, () => {
			logger.info(`server is running on port ${env.PORT}`);
		});
	} catch (error) {
		logger.error(error);
	}
}

bootstrapApplication();

export default app;
