import type { RequestHandler } from "express";
import { REQUEST_METHODS_MAP } from "../common/constants";
import { HttpStatus } from "../config/http.config";
import LogRepository from "../repositories/log.repository";
import { getRequestClientInfo } from "../utils/requestInfo.util";

const logRepository = new LogRepository();

export const saveHistory = (resource: string): RequestHandler => {
	return async (request, response, next) => {
		response.on("finish", async () => {
			try {
				if (response.statusCode >= HttpStatus.BAD_REQUEST) return;
				const user = request.user;

				if (!user) return;
				const { ip, platform, agent } = getRequestClientInfo(request);

				await logRepository.createLog({
					admin: user.id,
					resource,
					action: REQUEST_METHODS_MAP[request.method],
					ip,
					platform,
					agent,
				});
			} catch (error) {
				console.error("Failed to save history", error);
			}
		});
		next();
	};
};
