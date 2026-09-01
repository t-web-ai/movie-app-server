import type { ClientSession } from "mongoose";
import { hashPassword } from "../../utils/bcrypt.util";
import logger from "../../utils/logger.util";
import type { AdminInput } from "../../validators/schemas/admin.schema";
import { Admin } from "../models/admin.model";
import { ROLE } from "./constant";

const admins: AdminInput[] = [
	{
		name: "Toee Thiha Kyaw",
		email: "toeethiha@cbs.com.mm",
		password: "12345678",
		role: ROLE.SUPER_ADMIN,
	},
	{
		name: "Admin",
		email: "admin@gmail.com",
		password: "87654321",
		role: ROLE.ADMIN,
	},
];

export async function seedAdmin(session: ClientSession) {
	logger.info("seeding the admins data");
	const modifiedAdminsInPromise = admins.map(async (admin) => ({
		...admin,
		password: await hashPassword(admin.password),
	}));
	const modifiedAdmins = await Promise.all(modifiedAdminsInPromise);
	await Admin.insertMany(modifiedAdmins, { session });
	logger.info("the admins data are seeeded successfully");
}

export async function deleteAdmin(session: ClientSession) {
	await Admin.deleteMany({}, { session });
}
