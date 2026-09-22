import type { QueryFilter } from "mongoose";
import z from "zod";
import { ObjectIdSchema } from "../../common/schema";
import type { AdminSchemaType } from "../../db/models/admin.model";
import { buildDateRangeFilter, buildSearchFilter } from "../filter.util";

export function buildAdminFilterClause(
	filter: AdminFilterType,
): QueryFilter<AdminSchemaType> {
	const queryFilter: QueryFilter<AdminSchemaType> = {};
	if (filter.search) {
		buildSearchFilter(queryFilter, filter.search, ["name", "email"]);
	}

	if (filter.status) {
		queryFilter.status = {
			$eq: filter.status,
		};
	}

	if (filter.role) {
		queryFilter.role = {
			$eq: filter.role,
		};
	}

	buildDateRangeFilter({
		queryFilter,
		field: "createdAt",
		createdAfter: filter.createdAfter,
		createdBefore: filter.createdBefore,
	});

	return queryFilter;
}

export const AdminFilterSchema = z.object({
	search: z.string().optional(),
	status: z
		.enum(["active", "suspend"], {
			message: "Invalid status: must be active or suspend",
		})
		.optional(),
	role: ObjectIdSchema.optional(),
	createdBefore: z.coerce.date().optional(),
	createdAfter: z.coerce.date().optional(),
});

export type AdminFilterType = z.infer<typeof AdminFilterSchema>;
