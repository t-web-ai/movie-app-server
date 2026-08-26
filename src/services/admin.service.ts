import type { QueryFilter, Types } from "mongoose";
import { HttpStatus } from "../config/http.config";
import type { AdminSchemaType } from "../db/models/admin.model";
import { HttpError } from "../helpers/errors/http.error";
import type AdminRepository from "../repositories/admin.repository";
import type { AdminUpdateInput } from "../validators/schemas/admin.schema";
import type { PaginationInput } from "../validators/schemas/pagination.schema";

class AdminService {
	constructor(private readonly adminRepository: AdminRepository) {}
	async getAllAdmin(
		filter: QueryFilter<AdminSchemaType>,
		paginationInput: PaginationInput,
	) {
		const [admins, totalCount] = await Promise.all([
			this.adminRepository.getAllAdmin(filter, paginationInput),
			this.adminRepository.getAllAdminCount(filter),
		]);
		const totalPages = Math.ceil(totalCount / paginationInput.limit);
		return {
			admins,
			pagination: {
				foundCount: admins.length,
				totalCount,
				totalPages,
				page: paginationInput.page,
				limit: paginationInput.limit,
			},
		};
	}

	async getSignleAdmin(id: Types.ObjectId) {
		const admin = await this.adminRepository.getAdmin({ _id: id }, true);
		if (!admin) throw new HttpError(HttpStatus.NOT_FOUND, "No Admin");
		return { admin };
	}

	async updateAdmin(id: Types.ObjectId, data: AdminUpdateInput) {
		const admin = await this.adminRepository.updateAdmin({ _id: id }, data);
		if (!admin) throw new HttpError(HttpStatus.NOT_FOUND, "No Admin");
		return { admin };
	}

	async deleteAdminById(id: Types.ObjectId) {
		const admin = await this.adminRepository.deleteAdmin(id);
		if (!admin) throw new HttpError(HttpStatus.NOT_FOUND, "No Admin");
		return { admin };
	}
}

export default AdminService;
