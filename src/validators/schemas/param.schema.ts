import { Types } from "mongoose";
import z from "zod";

export const IdSchema = z.object({
	id: z
		.string()
		.refine((id) => Types.ObjectId.isValid(id), {
			message: "Invalid Object Id",
		})
		.transform((id) => new Types.ObjectId(id)),
});
