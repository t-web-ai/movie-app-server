import {
	type HydratedDocument,
	type InferSchemaType,
	model,
	Schema,
} from "mongoose";

const TalentSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
			unique: true,
		},
		image: new Schema(
			{
				file: {
					type: String,
				},
				fileId: {
					type: String,
				},
			},
			{ _id: false },
		),
	},
	{
		timestamps: true,
		toJSON: {
			virtuals: true,
		},
		toObject: {
			virtuals: true,
		},
	},
);

TalentSchema.virtual("castMovies", {
	ref: "movie",
	localField: "_id",
	foreignField: "casts",
});

TalentSchema.virtual("directedMovies", {
	ref: "movie",
	localField: "_id",
	foreignField: "directors",
});

export type TalentSchemaType = InferSchemaType<typeof TalentSchema>;
export type TalentDocument = HydratedDocument<TalentSchemaType>;

export const Talent = model("talent", TalentSchema);
