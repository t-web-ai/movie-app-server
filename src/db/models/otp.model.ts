import {
	type HydratedDocument,
	type InferSchemaType,
	model,
	Schema,
} from "mongoose";
import env from "../../config/env.config";

const OTPSchema = new Schema(
	{
		email: {
			type: String,
			required: true,
		},
		code: {
			type: String,
			required: true,
		},
		verified: {
			type: Boolean,
			default: false,
		},
		expireAt: {
			type: Date,
			default: () => new Date(Date.now() + env.OTP_EXPIRES_IN * 1000),
			expires: 0,
		},
	},
	{
		timestamps: true,
	},
);

export type OTPSchemaType = InferSchemaType<typeof OTPSchema>;
export type OTPDocument = HydratedDocument<OTPSchemaType>;

export const OTP = model("otp", OTPSchema);
