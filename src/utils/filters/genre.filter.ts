import { escapeRegExp } from "lodash";
import type { QueryFilter } from "mongoose";
import z from "zod";
import type { GenreDocument } from "../../db/models/genre.model";

export function buildGenreFilter(
	filter: GenreFilterType,
): QueryFilter<GenreDocument> {
	const queryFilter: QueryFilter<GenreDocument> = {};

	if (filter.search) {
		const search = escapeRegExp(filter.search);
		queryFilter.name = { $regex: search, $options: "i" };
	}

	return queryFilter;
}

export const GenreFilterSchema = z.object({
	search: z.string().min(1).optional(),
});

export type GenreFilterType = z.infer<typeof GenreFilterSchema>;
