import jwt from "jsonwebtoken";
import env from "../config/env.config";
import type { AuthUserInput } from "../validators/schemas/auth.schema";

export function generateToken(payload: AuthUserInput) {
	return jwt.sign(payload, env.JWT_SECRET_KEY, {
		expiresIn: env.JWT_EXPIRES_IN as jwt.SignOptions["expiresIn"],
	});
}

export function verifyToken(token: string): AuthUserInput {
	return jwt.verify(token, env.JWT_SECRET_KEY) as AuthUserInput;
}
