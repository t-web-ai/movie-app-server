import {
	type HydratedDocument,
	type InferSchemaType,
	model,
	Schema,
	Types,
} from "mongoose";

const LogSchema = new Schema(
	{
		admin: {
			type: Types.ObjectId,
			ref: "admin",
			required: true,
		},
		action: {
			type: String,
			enum: ["create", "update", "delete", "read"],
		},
		resource: {
			type: String,
			required: true,
		},
		ip: {
			type: String,
			default: null,
		},
		platform: {
			type: String,
			default: null,
		},
		agent: {
			type: String,
			default: null,
		},
	},
	{
		timestamps: true,
	},
);

export type LogSchemaType = InferSchemaType<typeof LogSchema>;

export type LogDocument = HydratedDocument<LogSchemaType>;

export const Log = model("log", LogSchema);
