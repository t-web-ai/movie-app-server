import type { ClientSession, Types } from "mongoose";
import { BadRequestError } from "../../helpers/errors/badRequest.error";
import { NotFoundError } from "../../helpers/errors/notFound.error";
import type EmailTemplateRepository from "../../repositories/emailTemplate.repository";
import type { EmailTemplateUpdateInput } from "../../validators/schemas/emailTemplate.schema";

class EmailTemplateService {
	constructor(
		private readonly emailTemplateRepository: EmailTemplateRepository,
	) {}
	async getAllEmailTemplates() {
		const emailTemplates =
			await this.emailTemplateRepository.getAllEmailTemplates();
		return { emailTemplates };
	}

	async getSingleEmailTemplate(id: Types.ObjectId) {
		const emailTemplate =
			await this.emailTemplateRepository.findOneEmailTemplate({ _id: id });
		if (!emailTemplate) throw new NotFoundError("No email template");
		return { emailTemplate };
	}

	async updateEmailTemplate(
		id: Types.ObjectId,
		emailTemplateUpdateInput: EmailTemplateUpdateInput,
		session: ClientSession,
	) {
		const emailTemplate =
			await this.emailTemplateRepository.findEmailTemplateAndUpdate(
				{ _id: id },
				emailTemplateUpdateInput,
				session,
			);
		if (!emailTemplate) new BadRequestError("Failed to update email template");
		return { emailTemplate };
	}
}

export default EmailTemplateService;
