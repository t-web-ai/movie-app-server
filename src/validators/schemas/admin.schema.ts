import { Types } from "mongoose";
import z from "zod";

export const AdminCreateSchema = z.object({
	name: z.string().min(1),
	email: z.email(),
	password: z.string().min(5),
	role: z
		.string()
		.refine((id) => Types.ObjectId.isValid(id), {
			message: "Invalid Object Id",
		})
		.transform((id) => new Types.ObjectId(id)),
});

export type AdminCreateInput = z.infer<typeof AdminCreateSchema>;

export const AdminLoginSchema = AdminCreateSchema.pick({
	email: true,
	password: true,
});

export type AdminLoginInput = z.infer<typeof AdminLoginSchema>;

export const AdminUpdateSchema = AdminCreateSchema.partial();

export type AdminUpdateInput = z.infer<typeof AdminUpdateSchema>;
