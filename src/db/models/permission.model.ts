import {
	type HydratedDocument,
	type InferSchemaType,
	model,
	Schema,
} from "mongoose";

const PermissionSchema = new Schema(
	{
		resource: {
			type: String,
			required: true,
			trim: true,
		},
		action: {
			type: String,
			enum: ["create", "read", "update", "delete"],
			required: true,
		},
	},
	{ timestamps: true },
);

export type PermissionSchemaType = InferSchemaType<typeof PermissionSchema>;
export type PermissionDocument = HydratedDocument<PermissionSchemaType>;

export const Permission = model("permission", PermissionSchema);
