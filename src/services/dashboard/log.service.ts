import type { QueryFilter, Types } from "mongoose";
import type { LogSchemaType } from "../../db/models/log.model";
import { NotFoundError } from "../../helpers/errors/notFound.error";
import type LogRepository from "../../repositories/log.repository";
import type {
	LogCreateInput,
	LogDeleteInput,
} from "../../validators/schemas/log.schema";
import type { PaginationInput } from "../../validators/schemas/pagination.schema";

class LogService {
	constructor(private readonly logRepository: LogRepository) {}
	async createLog(logCreateInput: LogCreateInput) {
		const log = await this.logRepository.createLog(logCreateInput);
		return { log };
	}

	async deleteSingleLog(id: Types.ObjectId) {
		const log = await this.logRepository.deleteSingleLog({ _id: id });
		if (!log) throw new NotFoundError("No log");

		return { log };
	}

	async deleteAllLogs(logDeleteInput: LogDeleteInput) {
		const logs = await this.logRepository.deleteAllLogs({
			resource: {
				...(logDeleteInput.type === "user" ? { $eq: "auth" } : { $ne: "auth" }),
			},
		});
		return { deletedCount: logs.deletedCount };
	}

	async getAllLogs(
		filter: QueryFilter<LogSchemaType>,
		paginationInput: PaginationInput,
	) {
		const [logs, totalCount] = await Promise.all([
			this.logRepository.getAllLogs(filter, paginationInput),
			this.logRepository.getAllLogsCount(filter),
		]);
		const totalPages = Math.ceil(totalCount / paginationInput.limit);
		return {
			logs,
			pagination: {
				foundCount: logs.length,
				totalCount,
				totalPages,
				page: paginationInput.page,
				limit: paginationInput.limit,
			},
		};
	}
}

export default LogService;
