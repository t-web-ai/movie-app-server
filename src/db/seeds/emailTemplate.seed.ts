import type { ClientSession } from "mongoose";
import logger from "../../utils/logger.util";
import type { EmailTemplateCreateInput } from "../../validators/schemas/emailTemplate.schema";
import { EmailTemplate } from "../models";

const admin_signup_success = {
	appName: "{{appName}}",
	adminName: "{{adminName}}",
	role: "{{role}}",
	adminEmail: "{{adminEmail}}",
	tempPassword: "{{tempPassword}}",
};
const forgot_password_otp = {
	adminName: "{{adminName}}",
	otp: "{{otp}}",
	expireAt: "{{expireAt}}",
};
const password_updated_alert = {
	adminName: "{{adminName}}",
	supportEmail: "{{supportEmail}}",
};
const account_deleted_confirmation = {
	adminName: "{{adminName}}",
};

export type admin_signup_success_types = keyof typeof admin_signup_success;
export type forgot_password_otp_types = keyof typeof forgot_password_otp;
export type password_updated_alert_types = keyof typeof password_updated_alert;
export type account_deleted_confirmation_types =
	keyof typeof account_deleted_confirmation;

export const emailTemplates: EmailTemplateCreateInput[] = [
	{
		type: "admin_signup_success",
		subject: "Welcome to {{appName}} Admin Portal",
		html: "<p>Hello {{adminName}},</p><p>Your account is created with the role <strong>{{role}}</strong>.</p><p>Email: {{adminEmail}}<br/>Temp Password: {{tempPassword}}</p><p><a href='{{portalUrl}}'>Login to Dashboard</a></p>",
		variables: Object.values(admin_signup_success),
	},
	{
		type: "forgot_password_otp",
		subject: "Password Reset OTP",
		html: "<p>Hello {{adminName}},</p><p>Your OTP to reset your password is: <strong>{{otp}}</strong></p><p>It expires in {{expireAt}} minutes.</p>",
		variables: Object.values(forgot_password_otp),
	},
	{
		type: "password_updated_alert",
		subject: "Password Updated",
		html: "<p>Hello {{adminName}},</p><p>Your password was updated. Contact support at {{supportEmail}} if you didn't do this.</p>",
		variables: Object.values(password_updated_alert),
	},
	{
		type: "account_deleted_confirmation",
		subject: "Account Deleted",
		html: "<p>Hello {{adminName}},</p><p>Your admin account was deleted.</p>",
		variables: Object.values(account_deleted_confirmation),
	},
];

export async function seedEmailTemplate(session: ClientSession) {
	logger.info("seeding the email templates data");
	await EmailTemplate.insertMany(emailTemplates, { session });
	logger.info("the email templates data are seeeded successfully");
}

export async function deleteEmailTemplate(session: ClientSession) {
	await EmailTemplate.deleteMany({}, { session });
}
