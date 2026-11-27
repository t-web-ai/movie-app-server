import type { Request } from "express";
import { UAParser } from "ua-parser-js";

export function getRequestClientInfo(request: Request) {
	const userAgent = request.headers["user-agent"];
	const result = userAgent ? new UAParser(userAgent).getResult() : null;

	return {
		ip: request.ip ?? null,
		platform: result?.os.name ?? null,
		agent: result?.browser.name ?? null,
	};
}
