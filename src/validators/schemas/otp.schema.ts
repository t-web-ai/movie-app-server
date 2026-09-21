import z from "zod";

export const OTPBaseSchema = z.object({
	email: z.email().trim().toLowerCase(),
	code: z.string().trim().min(6).max(6),
	verified: z.boolean(),
	expireAt: z.date(),
});

export const OTPCreateSchema = OTPBaseSchema.pick({ email: true });

export type OTPCreateInput = z.infer<typeof OTPCreateSchema>;

export const OTPVerifySchema = OTPBaseSchema.pick({
	email: true,
	code: true,
});

export type OTPVerifyInput = z.infer<typeof OTPVerifySchema>;

export const OTPUpdateSchema = OTPBaseSchema.partial();

export type OTPUpdateInput = z.infer<typeof OTPUpdateSchema>;
