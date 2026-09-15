import nodemailer, { type Mail, type SMTPSentMessageInfo } from "nodemailer";
import type { EmailSettingCreateInput } from "../validators/schemas/email.schema";

function isSameEmailSetting(
	current: EmailSettingCreateInput | null,
	emailSetting: EmailSettingCreateInput,
): boolean {
	if (!current) return false;

	return (
		current.host === emailSetting.host &&
		current.port === emailSetting.port &&
		current.secure === emailSetting.secure &&
		current.authUser === emailSetting.authUser &&
		current.authPass === emailSetting.authPass
	);
}

function initializeEmailConfig() {
	const defaultConfig: {
		currentEmailSetting: EmailSettingCreateInput | null;
		transporter: Mail<SMTPSentMessageInfo> | null;
	} = {
		currentEmailSetting: null,
		transporter: null,
	};
	return async (emailSetting: EmailSettingCreateInput) => {
		const { currentEmailSetting, transporter } = defaultConfig;
		if (
			!transporter ||
			!isSameEmailSetting(currentEmailSetting, emailSetting)
		) {
			defaultConfig.transporter = await createTransporterr(emailSetting);
			defaultConfig.currentEmailSetting = emailSetting;
		}
		return defaultConfig.transporter;
	};
}

async function createTransporterr({
	host,
	port,
	secure,
	authUser,
	authPass,
}: EmailSettingCreateInput) {
	const transporter = nodemailer.createTransport({
		host,
		port,
		secure,
		auth: {
			user: authUser,
			pass: authPass,
		},
	});
	await transporter.verify();
	return transporter;
}

export const getEmailTransporter = initializeEmailConfig();
