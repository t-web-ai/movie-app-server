import type { RequestHandler } from "express";
import {
	ForbiddenError,
	UnauthenticatedError,
} from "../helpers/errors/auth.error";
import RoleRepository from "../repositories/role.repository";
import type { ActionInput } from "../validators/schemas/auth.schema";

const roleRepository = new RoleRepository();

export const checkPermission = (
	resource: string,
	action: ActionInput,
): RequestHandler => {
	return async (request, _response, next) => {
		if (!request?.user) throw new UnauthenticatedError();

		const user = request.user;
		const role = await roleRepository.getSingleRoleById(user.role._id);

		const permission = role?.permissions?.some(
			(permission) =>
				permission.resource === resource && permission.action === action,
		);

		if (!permission) throw new ForbiddenError("You have no permission");
		next();
	};
};
