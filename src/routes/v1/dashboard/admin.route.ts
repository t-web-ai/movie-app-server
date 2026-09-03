import { Router } from "express";
import AdminController from "../../../controllers/dashboard/admin.controller";
import { controllerAsync } from "../../../middlewares/handlers/controllerAsync.handler";
import { checkPermission } from "../../../middlewares/permission.middleware";
import AdminRepository from "../../../repositories/dashboard/admin.repository";
import AdminService from "../../../services/dashboard/admin.service";

const router = Router();
const adminRepository = new AdminRepository();
const adminService = new AdminService(adminRepository);
const adminController = new AdminController(adminService);

router
	.route("/")
	.get([
		checkPermission("admin", "read"),
		controllerAsync((request, response) =>
			adminController.getAllAdmin(request, response),
		),
	])
	.post([
		checkPermission("admin", "create"),
		controllerAsync((request, response) =>
			adminController.createAdmin(request, response),
		),
	]);

router
	.route("/:id")
	.get([
		checkPermission("admin", "read"),
		controllerAsync((request, response) =>
			adminController.getSingleAdmin(request, response),
		),
	])
	.put([
		checkPermission("admin", "update"),
		controllerAsync((request, response) =>
			adminController.updateAdmin(request, response),
		),
	])
	.delete([
		checkPermission("admin", "delete"),
		controllerAsync((request, response) =>
			adminController.deleteAdmin(request, response),
		),
	]);

export default router;
