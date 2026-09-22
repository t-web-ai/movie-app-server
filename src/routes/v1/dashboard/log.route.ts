import { Router } from "express";
import LogController from "../../../controllers/dashboard/log.controller";
import { controllerAsync } from "../../../middlewares/handlers/controllerAsync.handler";
import { checkPermission } from "../../../middlewares/permission.middleware";
import LogRepository from "../../../repositories/log.repository";
import LogService from "../../../services/dashboard/log.service";

const router = Router();
const logRepository = new LogRepository();
const logService = new LogService(logRepository);
const logController = new LogController(logService);

router
	.route("/")
	.get([
		checkPermission("log", "read"),
		controllerAsync((request, response) =>
			logController.getAllLogs(request, response),
		),
	])
	.delete([
		checkPermission("log", "delete"),
		controllerAsync((request, response) =>
			logController.deleteAllLogs(request, response),
		),
	]);

router
	.route("/:id")
	.delete([
		checkPermission("log", "delete"),
		controllerAsync((request, response) =>
			logController.deleteLog(request, response),
		),
	]);

export default router;
