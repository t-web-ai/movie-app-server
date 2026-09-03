import {
	type HydratedDocument,
	type InferSchemaType,
	model,
	Schema,
	Types,
} from "mongoose";

const LinkSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
		},
		url: {
			type: String,
			required: true,
		},
	},
	{ _id: false },
);

const EpisodeSchema = new Schema(
	{
		episodeNumber: { type: Number, required: true },
		title: { type: String },
		links: [LinkSchema],
	},
	{ _id: false },
);

const SeasonSchema = new Schema(
	{
		name: { type: String, required: true },
		seasonNumber: { type: Number },
		episodes: [EpisodeSchema],
	},
	{ _id: false },
);

const MovieSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		imageUrl: {
			type: String,
		},
		releaseDate: {
			type: Date,
		},
		rating: {
			type: Number,
			min: 0,
			max: 10,
		},
		genre: [
			{
				type: Types.ObjectId,
				ref: "genre",
			},
		],
		director: [
			{
				type: Types.ObjectId,
				ref: "talent",
			},
		],
		directorCredited: {
			type: Boolean,
			default: true,
		},
		cast: [{ type: Types.ObjectId, ref: "talent" }],
		links: [LinkSchema],
		isSeries: {
			type: Boolean,
			default: false,
		},
		seasons: [SeasonSchema],
	},
	{
		timestamps: true,
	},
);

export type MovieSchemaType = InferSchemaType<typeof MovieSchema>;
export type MovieDocument = HydratedDocument<MovieSchemaType>;

export const Movie = model("movie", MovieSchema);
