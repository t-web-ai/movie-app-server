import { Permission } from "../db/models";

class PermissionRepository {
	async getAllPermissions() {
		const permissions = await Permission.find({});
		return permissions;
	}
}

export default PermissionRepository;
