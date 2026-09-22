import type { QueryFilter } from "mongoose";

type StringKeys<T> = {
	[K in keyof T]-?: T[K] extends string ? K : never;
}[keyof T];

export function buildSearchFilter<T>(
	queryFilter: QueryFilter<T>,
	search: string,
	fields: StringKeys<T>[],
) {
	queryFilter.$or = fields.map((field) => ({
		[field]: { $regex: search, $options: "i" },
	}));
}

type DateKeys<T> = {
	[K in keyof T]-?: NonNullable<T[K]> extends Date ? K : never;
}[keyof T];

export function buildDateRangeFilter<T>({
	queryFilter,
	field,
	createdAfter,
	createdBefore,
}: {
	queryFilter: QueryFilter<T>;
	field: DateKeys<T>;
	createdAfter?: Date;
	createdBefore?: Date;
}) {
	if (!createdAfter && !createdBefore) return;

	Object.assign(queryFilter, {
		[field]: {
			...(createdAfter && { $gte: createdAfter }),
			...(createdBefore && { $lte: createdBefore }),
		},
	});
}
