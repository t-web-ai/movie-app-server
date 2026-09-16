import z from "zod";

export const EmailSettingCreateSchema = z.object({
	host: z.string().trim().min(1),
	port: z.coerce.number().int().min(1),
	secure: z.boolean(),
	authUser: z.email().trim(),
	authPass: z.string().trim().min(1),
	default: z.boolean().optional(),
});

export type EmailSettingCreateInput = z.infer<typeof EmailSettingCreateSchema>;

export const EmailSettingUpdateSchema = EmailSettingCreateSchema.omit({
	default: true,
}).partial();

export type EmailSettingUpdateInput = z.infer<typeof EmailSettingUpdateSchema>;

export const EmailSchema = z.object({
	from: z.string().trim().min(1).optional(),
	to: z.email().trim(),
	subject: z.string().trim().min(1),
	html: z.string().trim().min(1),
});

export type EmailInput = z.infer<typeof EmailSchema>;
