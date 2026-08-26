import type { Request, Response } from "express";
import { successResponse } from "../helpers/response.helper";
import type AuthService from "../services/auth.service";
import { validateSchema } from "../utils/validate.util";
import { AdminLoginSchema } from "../validators/schemas/admin.schema";

class AuthController {
	constructor(private readonly authService: AuthService) {}
	async login(request: Request, response: Response) {
		const { body } = request;
		const adminLoginInput = validateSchema(AdminLoginSchema, body);
		const data = await this.authService.login(adminLoginInput);
		return successResponse({
			response,
			message: "Login successfully",
			data,
			status: 200,
		});
	}
}

export default AuthController;
