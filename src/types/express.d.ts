import type { AuthUserInput } from "../validators/schemas/auth.schema";

declare global {
	namespace Express {
		interface Request {
			user?: AuthUserInput;
		}
	}
}
