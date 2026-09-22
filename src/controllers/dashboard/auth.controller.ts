import type { Request, Response } from "express";
import { successResponse } from "../../helpers/response.helper";
import type AuthService from "../../services/dashboard/auth.service";
import type LogService from "../../services/dashboard/log.service";
import { verifyToken } from "../../utils/jwt.util";
import { getRequestClientInfo } from "../../utils/requestInfo.util";
import { validateSchema } from "../../utils/validate.util";
import { AdminLoginSchema } from "../../validators/schemas/admin.schema";

class AuthController {
	constructor(
		private readonly authService: AuthService,
		private readonly logService: LogService,
	) {}
	async login(request: Request, response: Response) {
		const { body } = request;
		const adminLoginInput = validateSchema(AdminLoginSchema, body);
		const data = await this.authService.login(adminLoginInput);

		const { id } = verifyToken(data.token);

		const { ip, platform, agent } = getRequestClientInfo(request);

		await this.logService.createLog({
			admin: id,
			action: "create",
			resource: "auth",
			ip,
			platform,
			agent,
		});

		return successResponse({
			response,
			message: "Login successfully",
			data,
			status: 200,
		});
	}
}

export default AuthController;
