import { config } from "dotenv";
import z from "zod";
import logger from "../utils/logger.util";
config({ quiet: true });

const EnvSchema = z.object({
	PORT: z.coerce.number().int().min(0).optional().default(3000),
	MONGODB_URI: z.string().min(1),
	SALT_ROUND: z.coerce.number().int().min(1),
	JWT_SECRET_KEY: z.string().min(1),
	JWT_EXPIRES_IN: z.string().optional().default("10m"),
	ENVIORNMENT: z
		.enum(["developement", "production"])
		.optional()
		.default("developement"),
});

type EnvType = z.infer<typeof EnvSchema>;

const { data, success, error } = EnvSchema.safeParse(process.env);

if (!success) {
	logger.error(error.message);
	process.exit(1);
}
const env: EnvType = data;
export default env;
