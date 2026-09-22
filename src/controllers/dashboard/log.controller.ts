import type { Request, Response } from "express";
import { successResponse } from "../../helpers/response.helper";
import type LogService from "../../services/dashboard/log.service";
import {
	buildLogFilter,
	LogFilterSchema,
} from "../../utils/filters/log.filter";
import { validateSchema } from "../../utils/validate.util";
import { LogDeleteSchema } from "../../validators/schemas/log.schema";
import { PaginationSchema } from "../../validators/schemas/pagination.schema";
import { IdSchema } from "../../validators/schemas/param.schema";

class LogController {
	constructor(private readonly logService: LogService) {}
	async deleteLog(request: Request, response: Response) {
		const { params } = request;
		const { id } = validateSchema(IdSchema, params);
		const data = await this.logService.deleteSingleLog(id);

		return successResponse({
			response,
			message: "Delete log successfully",
			data,
		});
	}

	async getAllLogs(request: Request, response: Response) {
		const { query } = request;
		const filterInput = validateSchema(LogFilterSchema, query);
		const filter = await buildLogFilter(filterInput);
		const paginationInput = validateSchema(PaginationSchema, query);

		const data = await this.logService.getAllLogs(filter, paginationInput);

		return successResponse({
			response,
			message: "Get all logs successfully",
			data,
		});
	}

	async deleteAllLogs(request: Request, response: Response) {
		const { query } = request;
		const logDeleteInput = validateSchema(LogDeleteSchema, query);
		const data = await this.logService.deleteAllLogs(logDeleteInput);

		return successResponse({
			response,
			message: `Delete all ${logDeleteInput.type} logs successfully`,
			data,
		});
	}
}

export default LogController;
