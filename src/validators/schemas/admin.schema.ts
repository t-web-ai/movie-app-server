import z from "zod";

export const AdminSchema = z.object({
	name: z.string().min(1),
	email: z.email(),
	password: z.string().min(5),
});

export type AdminInput = z.infer<typeof AdminSchema>;

export const AdminLoginSchema = AdminSchema.pick({
	email: true,
	password: true,
});

export type AdminLoginInput = z.infer<typeof AdminLoginSchema>;

export const AdminUpdateSchema = AdminSchema.partial();

export type AdminUpdateInput = z.infer<typeof AdminUpdateSchema>;
