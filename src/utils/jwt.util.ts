import jwt from "jsonwebtoken";
import env from "../config/env.config";
export function generateToken(payload: string | Buffer | object) {
	return jwt.sign(payload, env.JWT_SECRET_KEY, {
		expiresIn: env.JWT_EXPIRES_IN as jwt.SignOptions["expiresIn"],
	});
}

export function verifyToken(token: string) {
	return jwt.verify(token, env.JWT_SECRET_KEY);
}
