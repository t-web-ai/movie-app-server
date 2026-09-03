import { Router } from "express";
import RoleController from "../../../controllers/role.controller";
import { controllerAsync } from "../../../middlewares/handlers/controllerAsync.handler";
import RoleRepository from "../../../repositories/role.repository";
import RoleService from "../../../services/role.service";

const router = Router();
const roleRepository = new RoleRepository();
const roleService = new RoleService(roleRepository);
const roleController = new RoleController(roleService);

router
	.route("/")
	.get([
		controllerAsync((request, response) =>
			roleController.getAllRoles(request, response),
		),
	])
	.post([
		controllerAsync((request, response) =>
			roleController.createRole(request, response),
		),
	]);

router
	.route("/:id")
	.get([
		controllerAsync((request, response) =>
			roleController.getSingleRole(request, response),
		),
	])
	.put([
		controllerAsync((request, response) =>
			roleController.updateRole(request, response),
		),
	])
	.delete([
		controllerAsync((request, response) =>
			roleController.deleteRole(request, response),
		),
	]);

export default router;
