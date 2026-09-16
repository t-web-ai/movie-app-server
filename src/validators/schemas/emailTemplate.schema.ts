import { z } from "zod";

export const EmailTemplateTypeSchema = z.enum([
	"admin_signup_success",
	"forgot_password_otp",
	"password_updated_alert",
	"account_deleted_confirmation",
]);

export type EmailTemplateTypeInput = z.infer<typeof EmailTemplateTypeSchema>;

const EmailTemplateCreateSchema = z.object({
	type: EmailTemplateTypeSchema,
	subject: z.string().min(1, "Subject is required"),
	html: z.string().min(1, "HTML content is required"),
	variables: z.array(z.string()).default([]),
});

export type EmailTemplateCreateInput = z.infer<
	typeof EmailTemplateCreateSchema
>;

export const EmailTemplateUpdateSchema = EmailTemplateCreateSchema.omit({
	type: true,
	variables: true,
}).partial();

export type EmailTemplateUpdateInput = z.infer<
	typeof EmailTemplateUpdateSchema
>;
