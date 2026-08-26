import bcrypt from "bcrypt";
import env from "../config/env.config";

export async function hashPassword(password: string) {
	return await bcrypt.hash(password, env.SALT_ROUND);
}

export async function verifyPassword(password: string, hashedPassword: string) {
	return await bcrypt.compare(password, hashedPassword);
}
