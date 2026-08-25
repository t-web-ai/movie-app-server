import mongoose from "mongoose";
import env from "../../config/env.config";
import logger from "../../utils/logger.util";
import { seedAdmin } from "./admin.seed";

export async function seed() {
  try {
    logger.info("initialize database seeding");
    await mongoose.connect(env.MONGODB_URI);
    await seedAdmin();
  } catch (error) {
    logger.info("failed to seed", error);
    process.exitCode = 1;
  } finally {
    mongoose.disconnect();
    process.exit();
  }
}

seed();
