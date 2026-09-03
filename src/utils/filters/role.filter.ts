import z from "zod";

export const RoleQuerySchema = z.object({
	withPermissions: z
		.enum(["true", "false"])
		.optional()
		.default("false")
		.transform((value) => value === "true"),
});

export type RoleQueryType = z.infer<typeof RoleQuerySchema>;
