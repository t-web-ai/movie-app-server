import type { ClientSession } from "mongoose";
import logger from "../../utils/logger.util";
import { Role, type RoleDocument } from "../models/role.model";
import { PERMISSION, ROLE } from "./constant";

const roles: Partial<RoleDocument>[] = [
	{
		_id: ROLE.SUPER_ADMIN,
		name: "Super Admin",
		type: "system",
		permissions: [
			PERMISSION.ADMIN_CREATE,
			PERMISSION.ADMIN_READ,
			PERMISSION.ADMIN_UPDATE,
			PERMISSION.ADMIN_DELETE,
		],
	},
	{
		_id: ROLE.ADMIN,
		name: "Admin",
		type: "system",
		permissions: [PERMISSION.ADMIN_READ],
	},
];

export async function seedRole(session: ClientSession) {
	logger.info("seeding the roles data");
	await Role.insertMany(roles, { session });
	logger.info("the roles data are seeeded successfully");
}

export async function deleteRole(session: ClientSession) {
	await Role.deleteMany({}, { session });
}
