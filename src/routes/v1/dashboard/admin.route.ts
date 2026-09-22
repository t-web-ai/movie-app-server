import { Router } from "express";
import AdminController from "../../../controllers/dashboard/admin.controller";
import {
	controllerAsync,
	controllerAsyncWithTransaction,
} from "../../../middlewares/handlers/controllerAsync.handler";
import { saveHistory } from "../../../middlewares/history.middleware";
import { checkPermission } from "../../../middlewares/permission.middleware";
import AdminRepository from "../../../repositories/admin.repository";
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
		saveHistory("admin"),
		checkPermission("admin", "create"),
		controllerAsyncWithTransaction((request, response, session) =>
			adminController.createAdmin(request, response, session),
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
		saveHistory("admin"),
		checkPermission("admin", "update"),
		controllerAsyncWithTransaction((request, response, session) =>
			adminController.updateAdmin(request, response, session),
		),
	])
	.delete([
		saveHistory("admin"),
		checkPermission("admin", "delete"),
		controllerAsyncWithTransaction((request, response, session) =>
			adminController.deleteAdmin(request, response, session),
		),
	]);

export default router;
