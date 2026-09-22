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
	.all([checkPermission("admin")])
	.get([
		controllerAsync((request, response) =>
			adminController.getAllAdmin(request, response),
		),
	])
	.post([
		saveHistory("admin"),
		checkPermission("admin"),
		controllerAsyncWithTransaction((request, response, session) =>
			adminController.createAdmin(request, response, session),
		),
	]);

router
	.route("/:id")
	.all([checkPermission("admin")])
	.get([
		controllerAsync((request, response) =>
			adminController.getSingleAdmin(request, response),
		),
	])
	.put([
		saveHistory("admin"),
		controllerAsyncWithTransaction((request, response, session) =>
			adminController.updateAdmin(request, response, session),
		),
	])
	.delete([
		saveHistory("admin"),
		controllerAsyncWithTransaction((request, response, session) =>
			adminController.deleteAdmin(request, response, session),
		),
	]);

export default router;
