import type { Request, Response } from "express";
import { successResponse } from "../../helpers/response.helper";
import type TalentService from "../../services/dashboard/talent.service";
import {
	buildTalentFilter,
	TalentFilterSchema,
} from "../../utils/filters/talent.filter";
import { validateSchema } from "../../utils/validate.util";
import { PaginationSchema } from "../../validators/schemas/pagination.schema";
import { IdSchema } from "../../validators/schemas/param.schema";

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
			message: "Get all talents successfully",
			data,
		});
	}

	async getTalentDetails(request: Request, response: Response) {
		const { params } = request;
		const { id } = validateSchema(IdSchema, params);

		const data = await this.talentService.getTalentDetails({ _id: id });

		return successResponse({
			response,
			message: "Get a talent successfully",
			data,
		});
	}
}

export default TalentController;
