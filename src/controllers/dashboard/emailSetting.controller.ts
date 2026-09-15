import type { Request, Response } from "express";
import type { ClientSession } from "mongoose";
import { successResponse } from "../../helpers/response.helper";
import type EmailSetttingService from "../../services/dashboard/emailSetting.service";
import { validateSchema } from "../../utils/validate.util";
import {
	EmailSchema,
	EmailSettingUpdateSchema,
} from "../../validators/schemas/email.schema";

class EmailSettingController {
	constructor(private readonly emailSettingService: EmailSetttingService) {}
	async getEmailSetting(_request: Request, response: Response) {
		const data = await this.emailSettingService.getEmailSetting();

		return successResponse({
			response,
			message: "Get email setting successfully",
			data,
		});
	}

	async updateEmailSetting(
		request: Request,
		response: Response,
		session: ClientSession,
	) {
		const { body } = request;
		const emailSettingUpdateInput = validateSchema(
			EmailSettingUpdateSchema,
			body,
		);
		const data = await this.emailSettingService.updateEmailSetting(
			emailSettingUpdateInput,
			session,
		);

		return successResponse({
			response,
			message: "Update email setting successfully",
			data,
		});
	}

	async testEmail(request: Request, response: Response) {
		const { body } = request;
		const emailInput = validateSchema(EmailSchema, body);
		await this.emailSettingService.testEmail(emailInput);

		return successResponse({
			response,
			message: "Email is sent successfully",
		});
	}
}

export default EmailSettingController;
