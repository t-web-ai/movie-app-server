import { Router } from "express";
import AuthController from "../../../controllers/dashboard/auth.controller";
import { controllerAsync } from "../../../middlewares/handlers/controllerAsync.handler";
import AdminRepository from "../../../repositories/admin.repository";
import AuthService from "../../../services/dashboard/auth.service";

const router = Router();
const adminRepository = new AdminRepository();
const authService = new AuthService(adminRepository);
const authController = new AuthController(authService);

router
	.route("/login")
	.post([controllerAsync((req, res) => authController.login(req, res))]);

export default router;
