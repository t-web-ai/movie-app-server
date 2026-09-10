import z from "zod";

export const GenreCreateSchema = z.object({
	name: z.string().trim().min(1),
});

export type GenreCreateInput = z.infer<typeof GenreCreateSchema>;

export const GenreUpdateSchema = GenreCreateSchema.partial();

export type GenreUpdateInput = z.infer<typeof GenreUpdateSchema>;
