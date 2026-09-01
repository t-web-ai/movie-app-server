import {
	type HydratedDocument,
	type InferSchemaType,
	model,
	Schema,
	Types,
	type UpdateQuery,
} from "mongoose";
import { hashPassword } from "../../utils/bcrypt.util";

const AdminSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		role: {
			type: Types.ObjectId,
			ref: "role",
			required: true,
		},
		password: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true,
	},
);

export type AdminSchemaType = InferSchemaType<typeof AdminSchema>;
export type AdminDocument = HydratedDocument<AdminSchemaType>;

AdminSchema.pre("save", async function () {
	if (this.isModified("password")) {
		const hashedPassword = await hashPassword(this.password);
		this.password = hashedPassword;
	}
});
AdminSchema.pre(["findOneAndUpdate", "updateOne"], async function () {
	const update = this.getUpdate() as UpdateQuery<AdminDocument>;
	if (update?.password) {
		const hashedPassword = await hashPassword(update.password);
		update.password = hashedPassword;
	}
});

export const Admin = model("admin", AdminSchema);
