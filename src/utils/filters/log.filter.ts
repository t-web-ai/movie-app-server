import type { QueryFilter } from "mongoose";
import z from "zod";
import { ObjectIdSchema } from "../../common/schema";
import { Admin } from "../../db/models";
import type { LogSchemaType } from "../../db/models/log.model";
import { LogTypeSchema } from "../../validators/schemas/log.schema";

export async function buildLogFilter(
	filter: LogFilterType,
): Promise<QueryFilter<LogSchemaType>> {
	const queryFilter: QueryFilter<LogSchemaType> = {};

	if (filter.search) {
		const admins = await Admin.find(
			{
				$or: [
					{ name: { $regex: filter.search, $options: "i" } },
					{ email: { $regex: filter.search, $options: "i" } },
				],
			},
			{ _id: 1 },
		);
		const adminIds = admins.map((admin) => admin._id.toString());

		queryFilter.$or = [{ admin: { $in: adminIds } }];
	}

	if (filter.role) {
		const admins = await Admin.find(
			{
				role: { $eq: filter.role },
			},
			{ _id: 1 },
		);
		const adminIds = admins.map((admin) => admin._id.toString());

		queryFilter.$or = [{ admin: { $in: adminIds } }];
	}

	if (filter.type) {
		if (filter.type === "user") {
			queryFilter.resource = {
				$eq: "auth",
			};
		} else {
			queryFilter.resource = {
				$ne: "auth",
			};
		}
	}

	return queryFilter;
}

export const LogFilterSchema = z.object({
	search: z.string().trim().optional(),
	role: ObjectIdSchema.optional(),
	type: LogTypeSchema.optional(),
});

export type LogFilterType = z.infer<typeof LogFilterSchema>;
