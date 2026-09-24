import z from "zod";

export const PaginationSchema = z.object({
	page: z.coerce.number().int().min(1).optional().default(1),
	limit: z.coerce.number().int().min(1).optional().default(10),
	sort: z.string().optional().default("createdAt"),
	order: z
		.enum(
			["ascending", "descending"],
			"Invalid type: must be ascending or descending",
		)
		.optional()
		.default("descending"),
});

export type PaginationInput = z.infer<typeof PaginationSchema>;
