import type { QueryFilter } from "mongoose";
import z from "zod";
import type { GenreDocument } from "../../db/models/genre.model";

export function buildGenreFilter(
	filter: GenreFilterType,
): QueryFilter<GenreDocument> {
	const queryFilter: QueryFilter<GenreDocument> = {};

	if (filter.search) {
		queryFilter.name = { $regex: filter.search, $options: "i" };
	}

	return queryFilter;
}

export const GenreFilterSchema = z.object({
	search: z.string().min(1).optional(),
});

export type GenreFilterType = z.infer<typeof GenreFilterSchema>;
