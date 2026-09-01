import { IdSchema } from "../validators/schemas/param.schema";
import { validateSchema } from "./validate.util";

export function toObjectId(objectId: string) {
	const { id } = validateSchema(IdSchema, { id: objectId });
	return id;
}
