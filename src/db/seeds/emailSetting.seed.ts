import type { ClientSession } from "mongoose";
import env from "../../config/env.config";
import logger from "../../utils/logger.util";
import type { EmailSettingCreateInput } from "../../validators/schemas/email.schema";
import { EmailSetting } from "../models";

const emailSettingInput: EmailSettingCreateInput = {
	host: env.MAIL_HOST,
	port: env.MAIL_PORT,
	secure: env.MAIL_SECURE,
	authUser: env.MAIL_AUTH_USER,
	authPass: env.MAIL_AUTH_PASS,
	default: true,
};

export async function seedEmailSetting(session: ClientSession) {
	logger.info("seeding the email setting data");
	const emailSetting = new EmailSetting(emailSettingInput);
	await emailSetting.save({ session });
	logger.info("email setting data is seeeded successfully");
}

export async function deleteEmailSetting(session: ClientSession) {
	await EmailSetting.deleteMany({}, { session });
}
