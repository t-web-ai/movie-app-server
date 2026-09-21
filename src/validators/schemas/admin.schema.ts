import z from "zod";
import { ObjectIdSchema } from "../../common/schema";

export const AdminCreateSchema = z.object({
	name: z.string().min(1),
	email: z.email(),
	password: z.string().min(5),
	role: ObjectIdSchema,
	status: z
		.enum(["active", "suspend"], {
			message: "Invalid status: must be active or suspend",
		})
		.optional(),
});

export type AdminCreateInput = z.infer<typeof AdminCreateSchema>;

export const AdminLoginSchema = AdminCreateSchema.pick({
	email: true,
	password: true,
});

export type AdminLoginInput = z.infer<typeof AdminLoginSchema>;

export const AdminUpdateSchema = AdminCreateSchema.partial();

export type AdminUpdateInput = z.infer<typeof AdminUpdateSchema>;

export const ResetPasswordSchema = AdminCreateSchema.pick({
	email: true,
	password: true,
});

export type ResetPasswordInput = z.infer<typeof ResetPasswordSchema>;
