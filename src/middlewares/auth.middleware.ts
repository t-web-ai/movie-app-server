import type { RequestHandler } from "express";
import { UnauthenticatedError } from "../helpers/errors/auth.error";
import { verifyToken } from "../utils/jwt.util";
import { AuthUserSchema } from "../validators/schemas/auth.schema";

export const authMiddleware: RequestHandler = (request, _response, next) => {
	const authHeader = request.headers.authorization;
	if (!authHeader?.startsWith("Bearer "))
		throw new UnauthenticatedError("Bearer token is not found");

	const token = authHeader.split(" ")[1];
	if (!token) throw new UnauthenticatedError("Token is not provided");

	const payload = verifyToken(token);
	const { data, success, error } = AuthUserSchema.safeParse(payload);
	if (!success) {
		throw new UnauthenticatedError(error.message);
	}
	request.user = data;
	next();
};
