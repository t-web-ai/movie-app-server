import type { RequestHandler } from "express";
import { REQUEST_METHODS_MAP } from "../common/constants";
import {
	ForbiddenError,
	UnauthenticatedError,
} from "../helpers/errors/auth.error";
import RoleRepository from "../repositories/role.repository";

const roleRepository = new RoleRepository();

export const checkPermission = (resource: string): RequestHandler => {
	return async (request, _response, next) => {
		if (!request?.user) throw new UnauthenticatedError();

		const user = request.user;
		if (!user?.role?._id)
			throw new ForbiddenError("You don't even have a role");
		const role = await roleRepository.getSingleRoleById(user.role._id);

		const permission = role?.permissions?.some(
			(permission) =>
				permission.resource === resource &&
				permission.action === REQUEST_METHODS_MAP[request.method],
		);

		if (!permission) throw new ForbiddenError("You have no permission");
		next();
	};
};
