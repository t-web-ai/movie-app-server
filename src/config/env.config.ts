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

	FILE_LOCATION: z.string().trim().min(1),
	IMAGEKIT_PRIVATE_KEY: z.string().trim().min(1),

	MAIL_HOST: z.string().trim().min(1),
	MAIL_PORT: z.coerce.number().int().min(1),
	MAIL_SECURE: z.preprocess((secure) => secure === "true", z.boolean()),
	MAIL_AUTH_USER: z.email().trim(),
	MAIL_AUTH_PASS: z.string().trim().min(1),

	APP_NAME: z.string().trim().min(1),
	APP_URL: z.url().trim(),
	APP_SUPPORT_EMAIL: z.email().trim(),

	OTP_EXPIRES_IN: z.coerce.number().int().optional().default(10),
});

type EnvType = z.infer<typeof EnvSchema>;

const { data, success, error } = EnvSchema.safeParse(process.env);

if (!success) {
	logger.error(error.message);
	process.exit(1);
}
const env: EnvType = data;
export default env;
