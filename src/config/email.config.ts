import nodemailer, { type Mail, type SMTPSentMessageInfo } from "nodemailer";
import { NotFoundError } from "../helpers/errors/notFound.error";
import EmailSettingRepository from "../repositories/emailSetting.repository";
import EmailTemplateRepository from "../repositories/emailTemplate.repository";
import type { EmailSettingCreateInput } from "../validators/schemas/email.schema";
import type { EmailTemplateTypeInput } from "../validators/schemas/emailTemplate.schema";

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

async function createTransporter({
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

function createEmailTransporterGetter(
	emailSettingRepository: EmailSettingRepository,
) {
	const config: {
		currentEmailSetting: EmailSettingCreateInput | null;
		transporter: Mail<SMTPSentMessageInfo> | null;
	} = {
		currentEmailSetting: null,
		transporter: null,
	};

	return async () => {
		const { currentEmailSetting, transporter } = config;

		const emailSetting = await emailSettingRepository.findOneEmailSetting({
			default: true,
		});
		if (!emailSetting) throw new NotFoundError("No email setting");

		if (
			!transporter ||
			!isSameEmailSetting(currentEmailSetting, emailSetting)
		) {
			config.currentEmailSetting = emailSetting;
			config.transporter = await createTransporter(emailSetting);
		}

		return config.transporter;
	};
}

function createEmailTemplateGetter(
	emailTemplateRepository: EmailTemplateRepository,
) {
	return async (emailTemplateTypeInput: EmailTemplateTypeInput) => {
		const emailTemplate = await emailTemplateRepository.findOneEmailTemplate({
			type: emailTemplateTypeInput,
		});
		if (!emailTemplate) throw new NotFoundError("No email template");
		return emailTemplate;
	};
}

const emailSettingRepository = new EmailSettingRepository();
const emailTemplateRepository = new EmailTemplateRepository();

export const getEmailTransporter = createEmailTransporterGetter(
	emailSettingRepository,
);
export const getEmailTemplate = createEmailTemplateGetter(
	emailTemplateRepository,
);
