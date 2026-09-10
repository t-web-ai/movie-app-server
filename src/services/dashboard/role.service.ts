import type { QueryFilter, Types } from "mongoose";
import type { RoleDocument } from "../../db/models/role.model";
import { ForbiddenError } from "../../helpers/errors/auth.error";
import { BadRequestError } from "../../helpers/errors/badRequest.error";
import { NotFoundError } from "../../helpers/errors/notFound.error";
import type RoleRepository from "../../repositories/role.repository";
import type {
	RoleCreateInput,
	RoleUpdateInput,
} from "../../validators/schemas/role.schema";

class RoleService {
	constructor(private readonly roleRepository: RoleRepository) {}
	async getAllRoles(withPermissions: boolean) {
		const roles = await this.roleRepository.getAllRoles(withPermissions);
		return { roles };
	}

	async getSingleRoleById(id: Types.ObjectId) {
		const role = await this.roleRepository.getSingleRoleById(id);
		if (!role) throw new NotFoundError();

		return { role };
	}

	async createRole(roleCreateInput: RoleCreateInput) {
		const role = await this.roleRepository.createRole(roleCreateInput);
		return { role };
	}

	async updateRole(
		filter: QueryFilter<RoleDocument>,
		roleUpdateInput: RoleUpdateInput,
	) {
		const role = await this.roleRepository.updateRole(filter, roleUpdateInput);
		if (!role) throw new NotFoundError();

		return { role };
	}

	async deleteRole(filter: QueryFilter<RoleDocument>) {
		const roleWithAdmins =
			await this.roleRepository.getSingleRoleWithAdmins(filter);

		if (!roleWithAdmins) throw new NotFoundError();

		if (roleWithAdmins.admins.length > 0)
			throw new BadRequestError("This role is taken by some admins");

		if (roleWithAdmins?.type === "system")
			throw new ForbiddenError("This is system role");

		const role = await this.roleRepository.deleteRole(filter);
		return { role };
	}
}

export default RoleService;
