import mongoose from "mongoose";
import env from "../../config/env.config";
import logger from "../../utils/logger.util";
import {
	Admin,
	EmailSetting,
	EmailTemplate,
	Genre,
	Permission,
	Role,
} from "../models";
import { deleteAdmin, seedAdmin } from "./admin.seed";
import { deleteEmailSetting, seedEmailSetting } from "./emailSetting.seed";
import { deleteEmailTemplate, seedEmailTemplate } from "./emailTemplate.seed";
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

	prepareCollection([
		Admin,
		Role,
		Permission,
		Genre,
		EmailSetting,
		EmailTemplate,
	]);

	try {
		session.startTransaction();
		await deleteAdmin(session);
		await deleteRole(session);
		await deletePermission(session);
		await deleteGenre(session);
		await deleteEmailSetting(session);
		await deleteEmailTemplate(session);

		logger.info("initialize database seeding");
		await seedAdmin(session);
		await seedRole(session);
		await seedPermission(session);
		await seedGenre(session);
		await seedEmailSetting(session);
		await seedEmailTemplate(session);

		await session.commitTransaction();
	} catch (error) {
		logger.info("failed to seed", error);
		if (session.inTransaction()) {
			await session.abortTransaction();
			logger.info("all seeds are rollback");
		}
		process.exitCode = 1;
	} finally {
		await session.endSession();
		await mongoose.disconnect();
		process.exit();
	}
}

seed();
