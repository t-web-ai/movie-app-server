import { Router } from "express";
import AuthController from "../../../controllers/dashboard/auth.controller";
import OTPController from "../../../controllers/dashboard/otp.controller";
import {
	controllerAsync,
	controllerAsyncWithTransaction,
} from "../../../middlewares/handlers/controllerAsync.handler";
import AdminRepository from "../../../repositories/admin.repository";
import OTPRepository from "../../../repositories/otp.repository";
import AuthService from "../../../services/dashboard/auth.service";
import OTPService from "../../../services/dashboard/otp.service";

const router = Router();
const adminRepository = new AdminRepository();
const authService = new AuthService(adminRepository);
const authController = new AuthController(authService);

const otpRepository = new OTPRepository();
const otpService = new OTPService(otpRepository, adminRepository);
const otpController = new OTPController(otpService);

router
	.route("/login")
	.post([
		controllerAsync((request, response) =>
			authController.login(request, response),
		),
	]);

router
	.route("/forgot-password")
	.post([
		controllerAsyncWithTransaction((request, response, session) =>
			otpController.requestOTP(request, response, session),
		),
	]);

router
	.route("/verify-otp")
	.post([
		controllerAsyncWithTransaction((request, response, session) =>
			otpController.verifyOTP(request, response, session),
		),
	]);

router
	.route("/reset-password")
	.post([
		controllerAsyncWithTransaction((request, response, session) =>
			otpController.resetPassword(request, response, session),
		),
	]);

export default router;
