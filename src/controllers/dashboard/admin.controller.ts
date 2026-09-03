import type { Request, Response } from "express";
import { HttpStatus } from "../../config/http.config";
import { successResponse } from "../../helpers/response.helper";
import type AdminService from "../../services/dashboard/admin.service";
import {
	AdminFilterSchema,
	buildFilterClause,
} from "../../utils/filters/admin.filter";
import { validateSchema } from "../../utils/validate.util";
import {
	AdminSchema,
	AdminUpdateSchema,
} from "../../validators/schemas/admin.schema";
import { PaginationSchema } from "../../validators/schemas/pagination.schema";
import { IdSchema } from "../../validators/schemas/param.schema";

class AdminController {
	constructor(private readonly adminService: AdminService) {}
	async getAllAdmin(request: Request, response: Response) {
		const { query } = request;

		const filterInput = validateSchema(AdminFilterSchema, query);
		const filter = buildFilterClause(filterInput);
		const paginationInput = validateSchema(PaginationSchema, query);

		const data = await this.adminService.getAllAdmin(filter, paginationInput);
		return successResponse({
			response,
			message: "Get all admin successfully",
			data,
			status: HttpStatus.OK,
		});
	}

	async getSingleAdmin(request: Request, response: Response) {
		const { params } = request;
		const { id } = validateSchema(IdSchema, params);
		const data = await this.adminService.getSignleAdmin(id);
		return successResponse({
			response,
			message: "Get single admin successfully",
			data,
			status: HttpStatus.OK,
		});
	}

	async updateAdmin(request: Request, response: Response) {
		const { params, body } = request;
		const { id } = validateSchema(IdSchema, params);
		const adminUpdateInput = validateSchema(AdminUpdateSchema, body);

		const data = await this.adminService.updateAdmin(id, adminUpdateInput);
		return successResponse({
			response,
			message: "Update admin successfully",
			data,
			status: HttpStatus.OK,
		});
	}

	async deleteAdmin(request: Request, response: Response) {
		const { params } = request;
		const { id } = validateSchema(IdSchema, params);
		const data = await this.adminService.deleteAdminById(id);
		return successResponse({
			response,
			message: "Delete admin successfully",
			data,
			status: HttpStatus.OK,
		});
	}

	async createAdmin(request: Request, response: Response) {
		const { body } = request;
		const adminInput = validateSchema(AdminSchema, body);
		const data = await this.adminService.createAdmin(adminInput);
		return successResponse({
			response,
			message: "Create admin successfully",
			data,
			status: HttpStatus.OK,
		});
	}
}

export default AdminController;
