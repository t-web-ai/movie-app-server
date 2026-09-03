import type { Request, Response } from "express";
import { successResponse } from "../../helpers/response.helper";
import type PermissionService from "../../services/dashboard/permission.service";

class PermissionController {
	constructor(private readonly permissionService: PermissionService) {}
	async getAllPermissions(_request: Request, response: Response) {
		const data = await this.permissionService.getAllPermissions();

		return successResponse({
			response,
			message: "Get all permissions successfully",
			data,
		});
	}
}

export default PermissionController;
