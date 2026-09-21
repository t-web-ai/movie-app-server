import type { Request, Response } from "express";
import type { ClientSession } from "mongoose";
import { successResponse } from "../../helpers/response.helper";
import type OTPService from "../../services/dashboard/otp.service";
import { validateSchema } from "../../utils/validate.util";
import { ResetPasswordSchema } from "../../validators/schemas/admin.schema";
import {
	OTPCreateSchema,
	OTPVerifySchema,
} from "../../validators/schemas/otp.schema";

class OTPController {
	constructor(private readonly otpSerive: OTPService) {}

	async requestOTP(
		request: Request,
		response: Response,
		session: ClientSession,
	) {
		const { body } = request;
		const otpCreateInput = validateSchema(OTPCreateSchema, body);
		const { expireAt, message } = await this.otpSerive.requestOTP(
			otpCreateInput,
			session,
		);

		return successResponse({
			response,
			message,
			data: {
				expireAt,
			},
		});
	}

	async verifyOTP(
		request: Request,
		response: Response,
		session: ClientSession,
	) {
		const { body } = request;
		const verifyOTPInput = validateSchema(OTPVerifySchema, body);
		const { message } = await this.otpSerive.verifyOTP(verifyOTPInput, session);

		return successResponse({
			response,
			message,
		});
	}

	async resetPassword(
		request: Request,
		response: Response,
		session: ClientSession,
	) {
		const { body } = request;
		const resetPasswordInput = validateSchema(ResetPasswordSchema, body);
		await this.otpSerive.resetPassword(resetPasswordInput, session);

		return successResponse({
			response,
			message: "Password has been changed",
		});
	}
}

export default OTPController;
