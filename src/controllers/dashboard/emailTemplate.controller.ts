import type { Request, Response } from "express";
import type { ClientSession } from "mongoose";
import { successResponse } from "../../helpers/response.helper";
import type EmailTemplateService from "../../services/dashboard/emailTemplate.service";
import { validateSchema } from "../../utils/validate.util";
import { EmailTemplateUpdateSchema } from "../../validators/schemas/emailTemplate.schema";
import { IdSchema } from "../../validators/schemas/param.schema";

class EmailTemplateController {
	constructor(private readonly emailTemplateServie: EmailTemplateService) {}
	async getAllEmailTemplates(_request: Request, response: Response) {
		const data = await this.emailTemplateServie.getAllEmailTemplates();
		return successResponse({
			response,
			message: "Get all email templates successfully",
			data,
		});
	}

	async getSingleEmailTemplate(request: Request, response: Response) {
		const { params } = request;
		const { id } = validateSchema(IdSchema, params);

		const data = await this.emailTemplateServie.getSingleEmailTemplate(id);
		return successResponse({
			response,
			message: "Get email template successfully",
			data,
		});
	}

	async updateEmailTemplate(
		request: Request,
		response: Response,
		session: ClientSession,
	) {
		const { body, params } = request;
		const emailTemplateUpdateInput = validateSchema(
			EmailTemplateUpdateSchema,
			body,
		);
		const { id } = validateSchema(IdSchema, params);

		const data = await this.emailTemplateServie.updateEmailTemplate(
			id,
			emailTemplateUpdateInput,
			session,
		);

		return successResponse({
			response,
			message: "Update template successfully",
			data,
		});
	}
}

export default EmailTemplateController;
