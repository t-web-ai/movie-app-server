import type { ClientSession } from "mongoose";
import { getEmailTransporter } from "../../config/email.config";
import { BadRequestError } from "../../helpers/errors/badRequest.error";
import { NotFoundError } from "../../helpers/errors/notFound.error";
import type EmailSettingRepository from "../../repositories/emailSetting.repository";
import { sendEmail } from "../../utils/email.util";
import type {
	EmailInput,
	EmailSettingUpdateInput,
} from "../../validators/schemas/email.schema";

class EmailSetttingService {
	constructor(
		private readonly emailSettingRepository: EmailSettingRepository,
	) {}
	async getEmailSetting() {
		const emailSetting = await this.emailSettingRepository.findOneEmail({
			default: true,
		});
		if (!emailSetting) throw new NotFoundError("No email setting");

		return { emailSetting };
	}

	async updateEmailSetting(
		emailSettingUpdateInput: EmailSettingUpdateInput,
		session: ClientSession,
	) {
		const emailSetting = await this.emailSettingRepository.findEmailAndUpdate(
			{ default: true },
			emailSettingUpdateInput,
			session,
		);
		if (!emailSetting)
			throw new BadRequestError("Failed to update email setting");

		return { emailSetting };
	}

	async testEmail(emailInput: EmailInput) {
		const emailSetting = await this.emailSettingRepository.findOneEmail({
			default: true,
		});
		if (!emailSetting) throw new NotFoundError("No email setting");

		const transporter = await getEmailTransporter(emailSetting);
		if (transporter) {
			await sendEmail(transporter, emailInput);
		}
	}
}

export default EmailSetttingService;
