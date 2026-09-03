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
		},
		imageUrl: {
			type: String,
		},
	},
	{
		timestamps: true,
	},
);

export type TalentSchemaType = InferSchemaType<typeof TalentSchema>;
export type TalentDocument = HydratedDocument<TalentSchemaType>;

export const Talent = model("talent", TalentSchema);
