import type { Request } from "express";
import { UAParser } from "ua-parser-js";

export function getRequestClientInfo(request: Request) {
	const userAgent = request.headers["user-agent"];

	if (!userAgent)
		return {
			ip: request.ip ?? null,
			platform: null,
			agent: null,
		};

	const { os } = new UAParser(userAgent).getResult();

	return {
		ip: request.ip ?? null,
		platform: os.name ?? null,
		agent: userAgent,
	};
}
