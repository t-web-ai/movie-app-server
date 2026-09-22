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
		_id: PERMISSION.MOVIE_CREATE,
		resource: "movie",
		action: "create",
	},
	{
		_id: PERMISSION.MOVIE_READ,
		resource: "movie",
		action: "read",
	},
	{
		_id: PERMISSION.MOVIE_UPDATE,
		resource: "movie",
		action: "update",
	},
	{
		_id: PERMISSION.MOVIE_DELETE,
		resource: "movie",
		action: "delete",
	},

	{
		_id: PERMISSION.TALENT_CREATE,
		resource: "talent",
		action: "create",
	},
	{
		_id: PERMISSION.TALENT_READ,
		resource: "talent",
		action: "read",
	},
	{
		_id: PERMISSION.TALENT_UPDATE,
		resource: "talent",
		action: "update",
	},
	{
		_id: PERMISSION.TALENT_DELETE,
		resource: "talent",
		action: "delete",
	},

	{
		_id: PERMISSION.GENRE_CREATE,
		resource: "genre",
		action: "create",
	},
	{
		_id: PERMISSION.GENRE_READ,
		resource: "genre",
		action: "read",
	},
	{
		_id: PERMISSION.GENRE_UPDATE,
		resource: "genre",
		action: "update",
	},
	{
		_id: PERMISSION.GENRE_DELETE,
		resource: "genre",
		action: "delete",
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

	{
		_id: PERMISSION.EMAIL_SETTING_READ,
		resource: "email-setting",
		action: "read",
	},
	{
		_id: PERMISSION.EMAIL_SETTING_UPDATE,
		resource: "email-setting",
		action: "update",
	},

	{
		_id: PERMISSION.EMAIL_TEMPLATE_READ,
		resource: "email-template",
		action: "read",
	},
	{
		_id: PERMISSION.EMAIL_TEMPLATE_UPDATE,
		resource: "email-template",
		action: "update",
	},

	{
		_id: PERMISSION.LOG_READ,
		resource: "log",
		action: "read",
	},
	{
		_id: PERMISSION.LOG_DELETE,
		resource: "log",
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
