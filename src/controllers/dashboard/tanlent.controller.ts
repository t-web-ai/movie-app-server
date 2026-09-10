import type { Request, Response } from "express";
import type { ClientSession } from "mongoose";
import { successResponse } from "../../helpers/response.helper";
import type TalentService from "../../services/dashboard/talent.service";
import {
	buildTalentFilter,
	TalentFilterSchema,
} from "../../utils/filters/talent.filter";
import { validateSchema } from "../../utils/validate.util";
import { PaginationSchema } from "../../validators/schemas/pagination.schema";
import { IdSchema } from "../../validators/schemas/param.schema";
import {
	TalentCreateSchema,
	TalentUpdateSchema,
} from "../../validators/schemas/talent.schema";

class TalentController {
	constructor(private readonly talentService: TalentService) {}
	async getAllTalents(request: Request, response: Response) {
		const { query } = request;

		const filterInput = validateSchema(TalentFilterSchema, query);
		const filter = buildTalentFilter(filterInput);
		const paginationInput = validateSchema(PaginationSchema, query);

		const data = await this.talentService.getAllTalents(
			filter,
			paginationInput,
		);
		return successResponse({
			response,
			message: "Get all talent successfully",
			data,
		});
	}
	async updateTalent(
		request: Request,
		response: Response,
		session: ClientSession,
	) {
		const { body, params, file } = request;
		const { id } = validateSchema(IdSchema, params);
		const talentUpdateInput = validateSchema(TalentUpdateSchema, body);

		const data = await this.talentService.updateTalent({
			filter: { _id: id },
			talentUpdateInput,
			file,
			session,
		});
		return successResponse({
			response,
			message: "Update talent successfully",
			data,
		});
	}
	async deleteTalent(
		request: Request,
		response: Response,
		session: ClientSession,
	) {
		const { params } = request;
		const { id } = validateSchema(IdSchema, params);

		const data = await this.talentService.deleteTalent(id, session);
		return successResponse({
			response,
			message: "Delete admin successfully",
			data,
		});
	}
	async createTalent(
		request: Request,
		response: Response,
		session: ClientSession,
	) {
		const { body, file } = request;
		const talentCreateInput = validateSchema(TalentCreateSchema, body);

		const data = await this.talentService.createTalent({
			talentCreateInput,
			file,
			session,
		});
		return successResponse({
			response,
			message: "Create talent successfully",
			data,
		});
	}
}

export default TalentController;
