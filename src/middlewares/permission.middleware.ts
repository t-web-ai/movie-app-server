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
		const permission = request.user?.role?.permissions?.find(
			(permission) => permission.resource === resource,
		);

		if (!permission || permission.action !== action)
			throw new ForbiddenError("You have no permission");
		next();
	};
};
