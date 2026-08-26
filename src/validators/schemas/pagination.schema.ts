import z from "zod";

export const PaginationSchema = z.object({
	page: z.coerce.number().int().min(1).optional().default(1),
	limit: z.coerce.number().int().min(1).optional().default(10),
});

export type PaginationInput = z.infer<typeof PaginationSchema>;
