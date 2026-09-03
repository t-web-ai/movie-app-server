import {
	type HydratedDocument,
	type InferSchemaType,
	model,
	Schema,
} from "mongoose";

const GenreSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
			unique: true,
		},
	},
	{
		timestamps: true,
	},
);

export type GenreSchemaType = InferSchemaType<typeof GenreSchema>;
export type GenreDocument = HydratedDocument<GenreSchemaType>;

export const Genre = model("genre", GenreSchema);
