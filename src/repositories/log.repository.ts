import type { QueryFilter } from "mongoose";
import { Log } from "../db/models";
import type { LogDocument, LogSchemaType } from "../db/models/log.model";
import type { LogCreateInput } from "../validators/schemas/log.schema";
import type { PaginationInput } from "../validators/schemas/pagination.schema";

class LogRepository {
	async createLog(logCreateInput: LogCreateInput) {
		const log = new Log(logCreateInput);
		await log.save();
		return log;
	}

	async deleteSingleLog(filter: QueryFilter<LogDocument>) {
		return await Log.findOneAndDelete(filter);
	}

	async deleteAllLogs(filter: QueryFilter<LogDocument>) {
		return await Log.deleteMany(filter);
	}

	async getAllLogs(
		filter: QueryFilter<LogSchemaType>,
		paginationInput: PaginationInput,
	) {
		const logs = await Log.find(filter)
			.skip((paginationInput.page - 1) * paginationInput.limit)
			.populate({
				path: "admin",
				select: {
					_id: 0,
					name: 1,
					email: 1,
				},
				populate: {
					path: "role",
					select: {
						_id: 0,
						name: 1,
					},
				},
			})
			.limit(paginationInput.limit)
			.sort({ [paginationInput.sort]: paginationInput.order })
			.lean();
		return logs;
	}

	async getAllLogsCount(filter: QueryFilter<LogSchemaType>) {
		return await Log.countDocuments(filter);
	}
}

export default LogRepository;
