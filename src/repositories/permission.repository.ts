import { Permission } from "../db/models";

class PermissionRepository {
	async getAllPermissions() {
		const permissions = await Permission.find({})
			.sort({ createdAt: "descending" })
			.lean();
		return permissions;
	}
}

export default PermissionRepository;
