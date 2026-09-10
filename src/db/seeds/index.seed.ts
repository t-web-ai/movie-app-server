import mongoose from "mongoose";
import env from "../../config/env.config";
import logger from "../../utils/logger.util";
import { Admin, Permission, Role } from "../models";
import { Genre } from "../models/genre.model";
import { deleteAdmin, seedAdmin } from "./admin.seed";
import { deleteGenre, seedGenre } from "./genre.seed";
import { deletePermission, seedPermission } from "./permission.seed";
import { deleteRole, seedRole } from "./role.seed";

function prepareCollection(models: mongoose.Model<unknown>[]) {
	models.forEach(async (model) => {
		await model.createCollection();
		await model.init();
	});
}

export async function seed() {
	await mongoose.connect(env.MONGODB_URI);
	const session = await mongoose.startSession();

	prepareCollection([Admin, Role, Permission, Genre]);

	try {
		session.startTransaction();
		await deleteAdmin(session);
		await deleteRole(session);
		await deletePermission(session);
		await deleteGenre(session);

		logger.info("initialize database seeding");
		await seedAdmin(session);
		await seedRole(session);
		await seedPermission(session);
		await seedGenre(session);
		await session.commitTransaction();
	} catch (error) {
		logger.info("failed to seed", error);
		if (session.inTransaction()) {
			await session.abortTransaction();
			logger.info("all seeds are rollback");
		}
		process.exitCode = 1;
	} finally {
		session.endSession();
		mongoose.disconnect();
		process.exit();
	}
}

seed();
