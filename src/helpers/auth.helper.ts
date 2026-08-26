import type { Request } from "express";

export function getAuth(request: Request) {
	if (!request.user) {
		throw new Error("Unauthorized");
	}
	return request.user;
}
