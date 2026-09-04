import type { QueryFilter, Types } from "mongoose";
import { Role } from "../../db/models";
import type { RoleDocument, RoleSchemaType } from "../../db/models/role.model";
import type { AdminCreateInput } from "../../validators/schemas/admin.schema";
import type {
	RoleCreateInput,
	RoleUpdateInput,
} from "../../validators/schemas/role.schema";

class RoleRepository {
	async getAllRoles(withPermissions?: boolean) {
		const query = Role.find({}, withPermissions ? {} : { permissions: 0 });
		if (withPermissions) {
			query.populate("permissions");
		}
		const roles = await query.lean();
		return roles;
	}

	async getSingleRoleById(id: Types.ObjectId) {
		const role = await Role.findById(id).populate("permissions").lean();
		return role;
	}

	async getSingleRoleWithAdmins(filter: QueryFilter<RoleSchemaType>) {
		const role = await Role.findOne(filter).populate<{
			admins: AdminCreateInput[];
		}>({
			path: "admins",
			select: { name: 1, email: 1 },
		});
		return role;
	}

	async createRole(roleCreateInput: RoleCreateInput) {
		const role = new Role(roleCreateInput);
		await role.save();
		return role;
	}

	async updateRole(
		filter: QueryFilter<RoleSchemaType>,
		roleUpdateInput: RoleUpdateInput,
	) {
		const role = await Role.findOneAndUpdate(filter, roleUpdateInput, {
			returnDocument: "after",
		});
		return role;
	}

	async deleteRole(filter: QueryFilter<RoleDocument>) {
		return await Role.findOneAndDelete(filter);
	}
}

export default RoleRepository;
