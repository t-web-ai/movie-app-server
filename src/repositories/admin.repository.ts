import type { QueryFilter, Types } from "mongoose";
import { Admin } from "../db/models";
import type { AdminDocument, AdminSchemaType } from "../db/models/admin.model";
import type {
	AdminInput,
	AdminUpdateInput,
} from "../validators/schemas/admin.schema";
import type { AuthUserInput } from "../validators/schemas/auth.schema";
import type { PaginationInput } from "../validators/schemas/pagination.schema";

class AdminRepository {
	async getAdmin(filter: QueryFilter<AdminDocument>, safe?: boolean) {
		const admin = await Admin.findOne(filter)
			.select({ ...(safe && { password: 0 }) })
			.populate<AuthUserInput>({
				path: "role",
				populate: {
					path: "permissions",
				},
			})
			.lean();
		return admin;
	}
	async getAllAdmin(
		filter: QueryFilter<AdminSchemaType>,
		paginationInput: PaginationInput,
	) {
		const admins = await Admin.find(filter)
			.select({
				password: 0,
			})
			.populate({
				path: "role",
				populate: {
					path: "permissions",
				},
			})
			.skip((paginationInput.page - 1) * paginationInput.limit)
			.limit(paginationInput.limit)
			.lean();
		return admins;
	}
	async getAllAdminCount(filter: QueryFilter<AdminSchemaType>) {
		return await Admin.countDocuments(filter);
	}
	async updateAdmin(
		filter: QueryFilter<AdminDocument>,
		data: AdminUpdateInput,
	) {
		const admin = await Admin.findOneAndUpdate(filter, data, {
			returnDocument: "after",
		})
			.select({ password: 0 })
			.lean();
		return admin;
	}
	async deleteAdmin(id: Types.ObjectId) {
		return await Admin.findOneAndDelete(id);
	}
	async createAdmin(adminInput: AdminInput) {
		const admin = new Admin(adminInput);
		await admin.save();
		return admin;
	}
}

export default AdminRepository;
