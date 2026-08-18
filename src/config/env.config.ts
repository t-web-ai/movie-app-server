import { config } from "dotenv";
import z from "zod";
import logger from "../utils/logger.util";
config({ quiet: true });

const EnvSchema = z.object({
  PORT: z.coerce.number().min(0).optional().default(3000),
  MONGODB_URI: z.string().min(1),
});

type EnvType = z.infer<typeof EnvSchema>;

const { data, success, error } = EnvSchema.safeParse(process.env);

if (!success) {
  logger.error(error.message);
  process.exit(1);
}
const env: EnvType = data;
export default env;
