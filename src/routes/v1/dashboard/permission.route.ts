import { Router } from "express";
import PermissionController from "../../../controllers/dashboard/permission.controller";
import { controllerAsync } from "../../../middlewares/handlers/controllerAsync.handler";
import PermissionRepository from "../../../repositories/permission.repository";
import PermissionService from "../../../services/dashboard/permission.service";

const router = Router();
const permissionRepository = new PermissionRepository();
const permissionService = new PermissionService(permissionRepository);
const permissionController = new PermissionController(permissionService);

router
	.route("/")
	.get([
		controllerAsync((request, response) =>
			permissionController.getAllPermissions(request, response),
		),
	]);

export default router;
