import type { QueryFilter } from "mongoose";
import z from "zod";
import type { TalentSchemaType } from "../../db/models/talent.model";

export function buildTalentFilter(
	filter: TalentFilterType,
): QueryFilter<TalentSchemaType> {
	const queryFilter: QueryFilter<TalentSchemaType> = {};
	if (filter.search) {
		queryFilter.$or = [{ name: { $regex: filter.search, $options: "i" } }];
	}
	return queryFilter;
}

export const TalentFilterSchema = z.object({
	search: z.string().optional(),
});

export type TalentFilterType = z.infer<typeof TalentFilterSchema>;
