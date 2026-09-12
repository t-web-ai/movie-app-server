import { z } from "zod";
import { arrayable, ObjectIdSchema } from "../../common/schema";

const LinkSchema = z.object({
	name: z.string().trim().min(1),
	url: z.string().trim().min(1),
});

const EpisodeSchema = z.object({
	episodeNumber: z.coerce.number().int(),
	title: z.string().trim().min(1).optional(),
	links: z.array(LinkSchema).optional(),
	rating: z.coerce.number().min(0).max(10).optional(),
});

const SeasonSchema = z.object({
	name: z.string().trim().min(1),
	seasonNumber: z.coerce.number().int().optional(),
	episodes: z.array(EpisodeSchema).optional(),
});

export const BaseMovieSchema = z.object({
	name: z.string().trim().min(1),
	description: z.string().trim().min(1),
	releaseDate: z.coerce.date().optional(),
	rating: z.coerce.number().min(0).max(10).optional(),
	genres: arrayable(ObjectIdSchema)
		.optional()
		.transform((genres) => {
			if (genres) {
				return [...new Set(genres.map((id) => id.toString()))];
			}
		}),
	directors: arrayable(ObjectIdSchema)
		.optional()
		.transform((directors) => {
			if (directors) {
				return [...new Set(directors.map((id) => id.toString()))];
			}
		}),
	directorCredited: z.enum(["true", "false"]).transform((v) => v === "true"),
	casts: arrayable(ObjectIdSchema)
		.optional()
		.transform((casts) => {
			if (casts) {
				return [...new Set(casts.map((id) => id.toString()))];
			}
		}),
	isSeries: z.enum(["true", "false"]).transform((v) => v === "true"),
});

export const MovieCreateSchema = z.discriminatedUnion(
	"isSeries",
	[
		BaseMovieSchema.extend({
			isSeries: z.literal("true"),
			seasons: z.array(SeasonSchema).min(1, "At least one season is required"),
			links: z
				.never("Links are not expected in a series")
				.nullable()
				.optional()
				.default(null),
		}),
		BaseMovieSchema.extend({
			isSeries: z.literal("false"),
			links: z.array(LinkSchema).min(1, "At least one link is required"),
			seasons: z
				.never("Seasons are not expected in a movie")
				.nullable()
				.optional()
				.default(null),
		}),
	],
	{ message: "Expected value : 'true' or 'false'" },
);

export type MovieCreateInput = z.infer<typeof MovieCreateSchema>;

export const MovieUpdateSchema = z.discriminatedUnion(
	"isSeries",
	[
		BaseMovieSchema.partial().extend({
			isSeries: z.literal("true"),
			seasons: z.array(SeasonSchema).min(1, "At least one season is required"),
			links: z
				.never("Links are not expected in a series")
				.nullable()
				.optional()
				.default(null),
		}),
		BaseMovieSchema.partial().extend({
			isSeries: z.literal("false"),
			links: z.array(LinkSchema).min(1, "At least one link is required"),
			seasons: z
				.never("Seasons are not expected in a movie")
				.nullable()
				.optional()
				.default(null),
		}),
		BaseMovieSchema.partial().extend({
			isSeries: z.literal(undefined).optional(),
			links: z
				.never("Confirm that it is a movie before adding links")
				.nullable()
				.optional(),
			seasons: z
				.never("Specify that it is a series before adding seasons")
				.nullable()
				.optional(),
		}),
	],
	{ message: "Expected value : 'true', 'false' or no value at all" },
);

export type MovieUpdateInput = z.infer<typeof MovieUpdateSchema>;
