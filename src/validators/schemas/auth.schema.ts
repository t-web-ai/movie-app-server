import z from "zod";
import { ObjectIdSchema } from "../../common/schema";

export const ActionSchema = z.enum(["create", "read", "update", "delete"]);
export const AuthUserSchema = z.object({
	id: ObjectIdSchema,
	name: z.string(),
	email: z.email(),
	role: ObjectIdSchema.nullable().default(null),
	status: z
		.enum(["suspend", "active"], {
			message: "Invalid status: must be active or suspend",
		})
		.optional(),
});

export type AuthUserInput = z.infer<typeof AuthUserSchema>;
export type ActionInput = z.infer<typeof ActionSchema>;
