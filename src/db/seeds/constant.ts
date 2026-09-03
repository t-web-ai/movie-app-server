import { toObjectId } from "../../utils/mongoose";

export const ROLE = {
	SUPER_ADMIN: toObjectId("507f1f77bcf86cd799439100"),
	ADMIN: toObjectId("507f1f77bcf86cd799439101"),
};

export const PERMISSION = {
	ADMIN_CREATE: toObjectId("507f1f77bcf86cd799439001"),
	ADMIN_READ: toObjectId("507f1f77bcf86cd799439002"),
	ADMIN_UPDATE: toObjectId("507f1f77bcf86cd799439003"),
	ADMIN_DELETE: toObjectId("507f1f77bcf86cd799439004"),

	ROLE_CREATE: toObjectId("507f1f77bcf86cd799439005"),
	ROLE_READ: toObjectId("507f1f77bcf86cd799439006"),
	ROLE_UPDATE: toObjectId("507f1f77bcf86cd799439007"),
	ROLE_DELETE: toObjectId("507f1f77bcf86cd799439008"),
};
