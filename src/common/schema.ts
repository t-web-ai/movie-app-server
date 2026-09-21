import { Types } from "mongoose";
import z from "zod";

export const ObjectIdSchema = z
	.string()
	.refine((id) => Types.ObjectId.isValid(id), {
		message: "Invalid Object Id",
	})
	.transform((id) => new Types.ObjectId(id));

export const arrayable = <T extends z.ZodTypeAny>(schema: T) =>
	z.preprocess(
		(val) => (val === undefined ? undefined : Array.isArray(val) ? val : [val]),
		z.array(schema),
	);
