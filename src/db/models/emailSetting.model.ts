import {
	type HydratedDocument,
	type InferSchemaType,
	model,
	Schema,
} from "mongoose";

const EmailSettingSchema = new Schema(
	{
		host: {
			type: String,
			required: true,
		},
		port: {
			type: Number,
			required: true,
		},
		secure: {
			type: Boolean,
			required: true,
		},
		authUser: {
			type: String,
			required: true,
		},
		authPass: {
			type: String,
			required: true,
		},
		default: {
			type: Boolean,
			default: false,
		},
	},
	{ timestamps: true },
);

export type EmailSettingSchemaType = InferSchemaType<typeof EmailSettingSchema>;
export type EmailSettingDocument = HydratedDocument<EmailSettingSchemaType>;

export const EmailSetting = model("email-setting", EmailSettingSchema);
