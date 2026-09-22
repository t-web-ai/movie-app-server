import z from "zod";
import { ObjectIdSchema } from "../../common/schema";
import { ActionSchema } from "./auth.schema";

export const LogCreateSchema = z.object({
	admin: ObjectIdSchema,
	action: ActionSchema,
	resource: z.string().trim().min(1),
	ip: z.string().trim().min(1).optional().nullable(),
	platform: z.string().trim().min(1).optional().nullable(),
	agent: z.string().trim().min(1).optional().nullable(),
});

export type LogCreateInput = z.infer<typeof LogCreateSchema>;

export const LogTypeSchema = z.enum(["user", "audit"], {
	message: "Invalid type: must be user or audit",
});

export const LogDeleteSchema = z.object({
	type: LogTypeSchema,
});

export type LogDeleteInput = z.infer<typeof LogDeleteSchema>;
