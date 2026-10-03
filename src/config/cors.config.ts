import type { CorsOptions } from "cors";
import env from "./env.config";

export const corsOptions: CorsOptions = {
	origin: env.CORS_ORIGINS,
};
