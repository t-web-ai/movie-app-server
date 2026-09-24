import type { QueryFilter } from "mongoose";
import z from "zod";
import { arrayable, ObjectIdSchema } from "../../common/schema";
import type { MovieSchemaType } from "../../db/models/movie.model";
import { Talent } from "../../db/models/talent.model";

export async function buildMovieFilter(
	filter: MovieFilterType,
): Promise<QueryFilter<MovieSchemaType>> {
	const queryFilter: QueryFilter<MovieSchemaType> = {};

	if (filter.search) {
		const talents = await Talent.find(
			{ name: { $regex: filter.search, $options: "i" } },
			{ _id: 1 },
		);
		const talentIds = talents.map((talent) => talent._id.toString());

		queryFilter.$or = [
			{ name: { $regex: filter.search, $options: "i" } },
			{ casts: { $in: talentIds } },
			{ directors: { $in: talentIds } },
		];
	}

	if (filter?.genres?.length) {
		const genreIds = filter.genres.map((genre) => genre._id.toString());
		queryFilter.genres = { $in: genreIds };
	}

	if (filter.type) {
		queryFilter.isSeries = {
			$eq: filter.type === "series",
		};
	}

	return queryFilter;
}

export const MovieFilterSchema = z.object({
	search: z.string().trim().optional(),
	genres: arrayable(ObjectIdSchema).optional(),
	type: z
		.enum(["movie", "series"], {
			message: "Invalild type: must be movie or series",
		})
		.optional(),
});

export type MovieFilterType = z.infer<typeof MovieFilterSchema>;
