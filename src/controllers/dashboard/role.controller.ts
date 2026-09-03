import type { Request, Response } from "express";
import { successResponse } from "../../helpers/response.helper";
import type RoleService from "../../services/dashboard/role.service";
import { RoleQuerySchema } from "../../utils/filters/role.filter";
import { validateSchema } from "../../utils/validate.util";
import { IdSchema } from "../../validators/schemas/param.schema";
import {
	RoleCreateSchema,
	RoleUpdateSchema,
} from "../../validators/schemas/role.schema";

class RoleController {
	constructor(private readonly roleService: RoleService) {}
	async getAllRoles(request: Request, response: Response) {
		const { query } = request;
		const { withPermissions } = validateSchema(RoleQuerySchema, query);
		const data = await this.roleService.getAllRoles(withPermissions);

		return successResponse({
			response,
			message: "Get all roles successfully",
			data,
		});
	}

	async getSingleRole(request: Request, response: Response) {
		const { params } = request;
		const { id } = validateSchema(IdSchema, params);
		const data = await this.roleService.getSingleRoleById(id);

		return successResponse({
			response,
			message: "Get a role successfully",
			data,
		});
	}

	async createRole(request: Request, response: Response) {
		const { body } = request;
		const roleCreateInput = validateSchema(RoleCreateSchema, body);
		const data = await this.roleService.createRole(roleCreateInput);

		return successResponse({
			response,
			message: "Create a new role successfully",
			data,
		});
	}

	async updateRole(request: Request, response: Response) {
		const { body, params } = request;
		const { id } = validateSchema(IdSchema, params);
		const roleUpdateInput = validateSchema(RoleUpdateSchema, body);
		const data = await this.roleService.updateRole(
			{ _id: id },
			roleUpdateInput,
		);

		return successResponse({
			response,
			message: "Update the role successfully",
			data,
		});
	}

	async deleteRole(request: Request, response: Response) {
		const { params } = request;
		const { id } = validateSchema(IdSchema, params);
		const data = await this.roleService.deleteRole({ _id: id });

		return successResponse({
			response,
			message: "Delete role successfully",
			data,
		});
	}
}

export default RoleController;
