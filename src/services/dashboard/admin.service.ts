import type { ClientSession, QueryFilter, Types } from "mongoose";
import type { AdminSchemaType } from "../../db/models/admin.model";
import { BadRequestError } from "../../helpers/errors/badRequest.error";
import { NotFoundError } from "../../helpers/errors/notFound.error";
import type AdminRepository from "../../repositories/admin.repository";
import type {
	AdminCreateInput,
	AdminUpdateInput,
} from "../../validators/schemas/admin.schema";
import type { PaginationInput } from "../../validators/schemas/pagination.schema";

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
		if (!admin) throw new NotFoundError("No Admin");
		return { admin };
	}

	async updateAdmin(
		id: Types.ObjectId,
		data: AdminUpdateInput,
		session: ClientSession,
	) {
		const admin = await this.adminRepository.updateAdmin(
			{ _id: id },
			data,
			session,
		);
		if (!admin) throw new NotFoundError("No Admin");
		return { admin };
	}

	async deleteAdminById(id: Types.ObjectId, session: ClientSession) {
		const admin = await this.adminRepository.deleteAdmin(id, session);
		if (!admin) throw new NotFoundError("No Admin");
		return { admin };
	}

	async createAdmin(
		adminCreateInput: AdminCreateInput,
		session: ClientSession,
	) {
		const admin = await this.adminRepository.createAdmin(
			adminCreateInput,
			session,
		);
		if (!admin) throw new BadRequestError("Faild to create admin");

		return { admin };
	}
}

export default AdminService;
