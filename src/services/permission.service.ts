import type PermissionRepository from "../repositories/permission.repository";

class PermissionService {
	constructor(private readonly permissionRepository: PermissionRepository) {}
	async getAllPermissions() {
		const permissions = await this.permissionRepository.getAllPermissions();
		return { permissions };
	}
}

export default PermissionService;
