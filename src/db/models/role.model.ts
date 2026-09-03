import {
	type HydratedDocument,
	type InferSchemaType,
	model,
	Schema,
	Types,
} from "mongoose";

const RoleSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
			unique: true,
		},
		permissions: [{ type: Types.ObjectId, ref: "permission", required: true }],
		type: {
			type: String,
			enum: ["system", "custom"],
			default: "custom",
		},
	},
	{
		timestamps: true,
		toJSON: { virtuals: true },
		toObject: { virtuals: true },
	},
);

RoleSchema.virtual("admins", {
	ref: "admin",
	localField: "_id",
	foreignField: "role",
});

export type RoleSchemaType = InferSchemaType<typeof RoleSchema>;
export type RoleDocument = HydratedDocument<RoleSchemaType>;

export const Role = model("role", RoleSchema);
