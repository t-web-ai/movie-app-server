import z from "zod";
import { ActionSchema } from "./auth.schema";

export const PermissionSchema = z.object({
	resource: z.string(),
	action: ActionSchema,
});

export type PermissionInput = z.infer<typeof PermissionSchema>;
