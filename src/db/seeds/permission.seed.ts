import type { ClientSession } from "mongoose";
import logger from "../../utils/logger.util";
import {
	Permission,
	type PermissionDocument,
} from "../models/permission.model";
import { PERMISSION } from "./constant";

const permissions: Partial<PermissionDocument>[] = [
	{
		_id: PERMISSION.ADMIN_CREATE,
		resource: "admin",
		action: "create",
	},
	{
		_id: PERMISSION.ADMIN_DELETE,
		resource: "admin",
		action: "delete",
	},
	{
		_id: PERMISSION.ADMIN_UPDATE,
		resource: "admin",
		action: "update",
	},
	{
		_id: PERMISSION.ADMIN_READ,
		resource: "admin",
		action: "read",
	},

	{
		_id: PERMISSION.ROLE_CREATE,
		resource: "role",
		action: "create",
	},
	{
		_id: PERMISSION.ROLE_READ,
		resource: "role",
		action: "read",
	},
	{
		_id: PERMISSION.ROLE_UPDATE,
		resource: "role",
		action: "update",
	},
	{
		_id: PERMISSION.ROLE_DELETE,
		resource: "role",
		action: "delete",
	},
];

export async function seedPermission(session: ClientSession) {
	logger.info("seeding the permissions data");
	await Permission.insertMany(permissions, { session });
	logger.info("the permissions data are seeeded successfully");
}

export async function deletePermission(session: ClientSession) {
	await Permission.deleteMany({}, { session });
}
