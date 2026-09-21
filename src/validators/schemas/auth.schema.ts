import z from "zod";
import { ObjectIdSchema } from "../../common/schema";

export const ActionSchema = z.enum(["create", "read", "update", "delete"]);
export const AuthUserSchema = z.object({
	name: z.string(),
	email: z.email(),
	role: ObjectIdSchema.nullable().default(null),
});

export type AuthUserInput = z.infer<typeof AuthUserSchema>;
export type ActionInput = z.infer<typeof ActionSchema>;
