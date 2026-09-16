import {
	type HydratedDocument,
	type InferSchemaType,
	model,
	Schema,
} from "mongoose";

const EmailTemplateSchema = new Schema(
	{
		type: {
			type: String,
			required: true,
		},
		subject: {
			type: String,
			required: true,
		},
		html: {
			type: String,
			required: true,
		},
		variables: [{ type: String }],
	},
	{
		timestamps: true,
	},
);

export type EmailTemplateSchemaType = InferSchemaType<
	typeof EmailTemplateSchema
>;
export type EmailTemplateDocument = HydratedDocument<EmailTemplateSchemaType>;

export const EmailTemplate = model("email-template", EmailTemplateSchema);
