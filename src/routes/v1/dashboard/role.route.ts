import { Router } from "express";
import RoleController from "../../../controllers/dashboard/role.controller";
import { controllerAsync } from "../../../middlewares/handlers/controllerAsync.handler";
import { checkPermission } from "../../../middlewares/permission.middleware";
import RoleRepository from "../../../repositories/role.repository";
import RoleService from "../../../services/dashboard/role.service";

const router = Router();
const roleRepository = new RoleRepository();
const roleService = new RoleService(roleRepository);
const roleController = new RoleController(roleService);

router
	.route("/")
	.get([
		checkPermission("role", "read"),
		controllerAsync((request, response) =>
			roleController.getAllRoles(request, response),
		),
	])
	.post([
		checkPermission("role", "create"),
		controllerAsync((request, response) =>
			roleController.createRole(request, response),
		),
	]);

router
	.route("/:id")
	.get([
		checkPermission("role", "read"),
		controllerAsync((request, response) =>
			roleController.getSingleRole(request, response),
		),
	])
	.put([
		checkPermission("role", "update"),
		controllerAsync((request, response) =>
			roleController.updateRole(request, response),
		),
	])
	.delete([
		checkPermission("role", "delete"),
		controllerAsync((request, response) =>
			roleController.deleteRole(request, response),
		),
	]);

export default router;
