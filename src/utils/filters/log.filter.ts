import { escapeRegExp } from "lodash";
import type { QueryFilter } from "mongoose";
import z from "zod";
import { ObjectIdSchema } from "../../common/schema";
import { Admin } from "../../db/models";
import type { AdminSchemaType } from "../../db/models/admin.model";
import type { LogSchemaType } from "../../db/models/log.model";
import { LogTypeSchema } from "../../validators/schemas/log.schema";
import { buildDateRangeFilter } from "../filter.util";

export async function buildLogFilter(
	filter: LogFilterType,
): Promise<QueryFilter<LogSchemaType>> {
	const queryFilter: QueryFilter<LogSchemaType> = {};

	const adminFilter: QueryFilter<AdminSchemaType> = {};

	if (filter.search) {
		const search = escapeRegExp(filter.search);
		adminFilter.$or = [
			{ name: { $regex: search, $options: "i" } },
			{ email: { $regex: search, $options: "i" } },
		];
	}

	if (filter.role) {
		adminFilter.role = filter.role;
	}

	if (Object.keys(adminFilter).length) {
		const admins = await Admin.find(adminFilter, { _id: 1 });
		queryFilter.admin = { $in: admins.map((admin) => admin._id.toString()) };
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

	buildDateRangeFilter({
		queryFilter,
		field: "createdAt",
		createdAfter: filter.createdAfter,
		createdBefore: filter.createdBefore,
	});

	return queryFilter;
}

export const LogFilterSchema = z.object({
	search: z.string().trim().optional(),
	role: ObjectIdSchema.optional(),
	type: LogTypeSchema.optional(),
	createdBefore: z.coerce.date().optional(),
	createdAfter: z.coerce.date().optional(),
});

export type LogFilterType = z.infer<typeof LogFilterSchema>;
