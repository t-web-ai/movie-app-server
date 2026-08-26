import type { ZodType } from "zod";

export function validateSchema<T>(schema: ZodType<T>, body: unknown): T {
	const { data, success, error } = schema.safeParse(body);
	if (!success) throw error;
	return data;
}
