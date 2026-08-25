import { Router } from "express";
import AuthController from "../../../controllers/auth.controller";
import { controllerAsync } from "../../../middlewares/handlers/controllerAsync.handler";
import AuthService from "../../../services/auth.service";
import AdminRepository from "../../../repositories/admin.repository";

const router = Router();
const adminRepository = new AdminRepository();
const authService = new AuthService(adminRepository);
const authController = new AuthController(authService);

router
  .route("/login")
  .post([controllerAsync((req, res) => authController.login(req, res))]);

export default router;
