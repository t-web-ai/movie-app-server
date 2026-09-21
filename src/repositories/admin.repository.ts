import type { ClientSession, QueryFilter, Types } from "mongoose";
import { Admin } from "../db/models";
import type { AdminDocument, AdminSchemaType } from "../db/models/admin.model";
import type {
	AdminCreateInput,
	AdminUpdateInput,
} from "../validators/schemas/admin.schema";
import type { PaginationInput } from "../validators/schemas/pagination.schema";

class AdminRepository {
	async getAdmin(filter: QueryFilter<AdminDocument>, safe?: boolean) {
		const admin = await Admin.findOne(filter)
			.select({ ...(safe && { password: 0 }) })
			.populate({
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
				select: { _id: 1, name: 1 },
			})
			.skip((paginationInput.page - 1) * paginationInput.limit)
			.limit(paginationInput.limit)
			.sort({ createdAt: "descending" })
			.lean();
		return admins;
	}
	async getAllAdminCount(filter: QueryFilter<AdminSchemaType>) {
		return await Admin.countDocuments(filter);
	}
	async updateAdmin(
		filter: QueryFilter<AdminDocument>,
		data: AdminUpdateInput,
		session: ClientSession,
	) {
		const admin = await Admin.findOneAndUpdate(filter, data, {
			session,
			returnDocument: "after",
		})
			.select({ password: 0 })
			.lean();
		return admin;
	}
	async deleteAdmin(id: Types.ObjectId, session: ClientSession) {
		return await Admin.findOneAndDelete(id, { session });
	}
	async createAdmin(
		adminCreateInput: AdminCreateInput,
		session: ClientSession,
	) {
		const admin = new Admin(adminCreateInput);
		await admin.save({ session });
		return admin.populate<{ role: { name: string } | null }>("role");
	}
}

export default AdminRepository;
