import { Types } from "mongoose";
import z from "zod";

export const ActionSchema = z.enum(["create", "read", "update", "delete"]);
export const AuthUserSchema = z.object({
	name: z.string(),
	email: z.email(),
	role: z.object({
		_id: z
			.string()
			.refine((id) => Types.ObjectId.isValid(id), {
				message: "Invalid Object Id",
			})
			.transform((id) => new Types.ObjectId(id)),
		name: z.string(),
		type: z.string(),
		permissions: z.array(
			z.object({
				resource: z.string(),
				action: ActionSchema,
			}),
		),
	}),
});

export type AuthUserInput = z.infer<typeof AuthUserSchema>;
export type ActionInput = z.infer<typeof ActionSchema>;
