import type { ClientSession, QueryFilter } from "mongoose";
import { EmailTemplate } from "../db/models";
import type { EmailTemplateDocument } from "../db/models/emailTemplate.model";
import type { EmailTemplateUpdateInput } from "../validators/schemas/emailTemplate.schema";

class EmailTemplateRepository {
	async getAllEmailTemplates() {
		const emailTemplates = await EmailTemplate.find().lean();
		return emailTemplates;
	}

	async findOneEmailTemplate(filter: QueryFilter<EmailTemplateDocument>) {
		const emailTemplate = await EmailTemplate.findOne(filter).lean();
		return emailTemplate;
	}

	async findEmailTemplateAndUpdate(
		filter: QueryFilter<EmailTemplateDocument>,
		emailTemplateUpdateInput: EmailTemplateUpdateInput,
		session: ClientSession,
	) {
		const emailTemplate = await EmailTemplate.findOneAndUpdate(
			filter,
			emailTemplateUpdateInput,
			{
				session,
				returnDocument: "after",
			},
		).lean();
		return emailTemplate;
	}
}

export default EmailTemplateRepository;
