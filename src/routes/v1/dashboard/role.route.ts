import { Router } from "express";
import RoleController from "../../../controllers/dashboard/role.controller";
import { controllerAsync } from "../../../middlewares/handlers/controllerAsync.handler";
import { saveHistory } from "../../../middlewares/history.middleware";
import { checkPermission } from "../../../middlewares/permission.middleware";
import RoleRepository from "../../../repositories/role.repository";
import RoleService from "../../../services/dashboard/role.service";

const router = Router();
const roleRepository = new RoleRepository();
const roleService = new RoleService(roleRepository);
const roleController = new RoleController(roleService);

router
	.route("/")
	.all([checkPermission("role")])
	.get([
		controllerAsync((request, response) =>
			roleController.getAllRoles(request, response),
		),
	])
	.post([
		saveHistory("role"),
		controllerAsync((request, response) =>
			roleController.createRole(request, response),
		),
	]);

router
	.route("/:id")
	.all([checkPermission("role")])
	.get([
		controllerAsync((request, response) =>
			roleController.getSingleRole(request, response),
		),
	])
	.put([
		saveHistory("role"),
		controllerAsync((request, response) =>
			roleController.updateRole(request, response),
		),
	])
	.delete([
		saveHistory("role"),
		controllerAsync((request, response) =>
			roleController.deleteRole(request, response),
		),
	]);

export default router;
