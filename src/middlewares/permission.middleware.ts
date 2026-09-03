import type { RequestHandler } from "express";
import {
	ForbiddenError,
	UnauthenticatedError,
} from "../helpers/errors/auth.error";
import type { ActionInput } from "../validators/schemas/auth.schema";

export const checkPermission = (
	resource: string,
	action: ActionInput,
): RequestHandler => {
	return (request, _response, next) => {
		if (!request?.user) throw new UnauthenticatedError();
		const permission = request.user?.role?.permissions?.some(
			(permission) =>
				permission.resource === resource && permission.action === action,
		);

		if (!permission) throw new ForbiddenError("You have no permission");
		next();
	};
};
