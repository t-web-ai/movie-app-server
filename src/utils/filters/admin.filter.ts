import type { QueryFilter } from "mongoose";
import z from "zod";
import type { AdminSchemaType } from "../../db/models/admin.model";

export function buildAdminFilterClause(
	filter: AdminFilterType,
): QueryFilter<AdminSchemaType> {
	const queryFilter: QueryFilter<AdminSchemaType> = {};
	if (filter.search) {
		queryFilter.$or = [
			{ name: { $regex: filter.search, $options: "i" } },
			{ email: { $regex: filter.search, $options: "i" } },
		];
	}
	return queryFilter;
}

export const AdminFilterSchema = z.object({
	search: z.string().optional(),
});

export type AdminFilterType = z.infer<typeof AdminFilterSchema>;
