import type { ClientSession } from "mongoose";
import {
	getEmailTemplate,
	getEmailTransporter,
} from "../../config/email.config";
import env from "../../config/env.config";
import type {
	forgot_password_otp_types,
	password_updated_alert_types,
} from "../../db/seeds/emailTemplate.seed";
import { BadRequestError } from "../../helpers/errors/badRequest.error";
import { NotFoundError } from "../../helpers/errors/notFound.error";
import type AdminRepository from "../../repositories/admin.repository";
import type OTPRepository from "../../repositories/otp.repository";
import { renderEmailTemplate, sendEmail } from "../../utils/email.util";
import { generateOTP } from "../../utils/otp.util";
import type { ResetPasswordInput } from "../../validators/schemas/admin.schema";
import type {
	OTPCreateInput,
	OTPVerifyInput,
} from "../../validators/schemas/otp.schema";

class OTPService {
	constructor(
		private readonly otpRepository: OTPRepository,
		private readonly adminRepository: AdminRepository,
	) {}
	async requestOTP(otpCreateInput: OTPCreateInput, session: ClientSession) {
		const admin = await this.adminRepository.getAdmin({
			email: otpCreateInput.email,
		});
		if (!admin) throw new NotFoundError("No admin");

		const activeOTP = await this.otpRepository.findOneOTP({
			email: otpCreateInput.email,
			expireAt: {
				$gt: new Date(),
			},
		});

		if (activeOTP)
			return {
				expireAt: activeOTP.expireAt,
				message: "OTP code is already sent to your email",
			};

		const code = generateOTP();
		const otp = await this.otpRepository.createOTP(
			otpCreateInput,
			code,
			session,
		);

		const emailTransporter = await getEmailTransporter();
		const emailTemplate = await getEmailTemplate("forgot_password_otp");

		const emailInput = renderEmailTemplate<forgot_password_otp_types>(
			{
				to: otpCreateInput.email,
				subject: emailTemplate.subject,
				html: emailTemplate.html,
			},
			{
				otp: code,
				adminName: admin.name,
				expireAt: Math.ceil(env.OTP_EXPIRES_IN / 60).toString(),
			},
		);

		if (emailTransporter) {
			await sendEmail(emailTransporter, emailInput);
		}

		return {
			expireAt: otp.expireAt,
			message: "OTP code is sent to your email",
		};
	}

	async verifyOTP(otpVerifyInput: OTPVerifyInput, session: ClientSession) {
		const admin = await this.adminRepository.getAdmin({
			email: otpVerifyInput.email,
		});
		if (!admin) throw new NotFoundError("No admin");

		const otp = await this.otpRepository.findOneOTP({
			email: otpVerifyInput.email,
			expireAt: { $gt: new Date() },
		});

		if (!otp) throw new BadRequestError("You need to request a new OTP code");

		if (otp.verified)
			return { message: "You have already verified the OTP code" };

		if (otp.code !== otpVerifyInput.code)
			throw new BadRequestError("OTP code is not valid");

		await this.otpRepository.updateOTP(
			{ _id: otp._id },
			{
				verified: true,
				expireAt: new Date(Date.now() + env.OTP_EXPIRES_IN * 1000),
			},
			session,
		);
		return {
			message: "OTP code is verified",
		};
	}

	async resetPassword(
		resetPasswordInput: ResetPasswordInput,
		session: ClientSession,
	) {
		const admin = await this.adminRepository.getAdmin({
			email: resetPasswordInput.email,
		});
		if (!admin) throw new NotFoundError("No admin");

		const otp = await this.otpRepository.findOneOTP({
			email: admin.email,
			expireAt: {
				$gt: new Date(),
			},
		});

		if (!otp) throw new BadRequestError("You need to request a new OTP code");

		if (!otp.verified) throw new BadRequestError("You need to verify OTP code");

		await this.adminRepository.updateAdmin(
			{ _id: admin._id },
			{ password: resetPasswordInput.password },
			session,
		);

		await this.otpRepository.deleteOTP({ _id: otp._id }, session);

		const emailTransporter = await getEmailTransporter();
		const emailTemplate = await getEmailTemplate("password_updated_alert");

		const emailInput = renderEmailTemplate<password_updated_alert_types>(
			{
				to: admin.email,
				subject: emailTemplate.subject,
				html: emailTemplate.html,
			},
			{
				adminName: admin.name,
				supportEmail: env.APP_SUPPORT_EMAIL,
			},
		);
		if (emailTransporter) {
			await sendEmail(emailTransporter, emailInput);
		}
	}
}

export default OTPService;
