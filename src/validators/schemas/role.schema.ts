import { Types } from "mongoose";
import z from "zod";

export const RoleCreateSchema = z.object({
	name: z.string().min(1).trim(),
	permissions: z.array(
		z
			.string()
			.refine((id) => Types.ObjectId.isValid(id), {
				message: "Invalid Object Id",
			})
			.transform((id) => new Types.ObjectId(id)),
	),
});

export type RoleCreateInput = z.infer<typeof RoleCreateSchema>;

export const RoleUpdateSchema = RoleCreateSchema.partial();

export type RoleUpdateInput = z.infer<typeof RoleUpdateSchema>;
