import { Router } from "express";
import EmailSettingController from "../../../controllers/dashboard/emailSetting.controller";
import {
	controllerAsync,
	controllerAsyncWithTransaction,
} from "../../../middlewares/handlers/controllerAsync.handler";
import { saveHistory } from "../../../middlewares/history.middleware";
import { checkPermission } from "../../../middlewares/permission.middleware";
import EmailSettingRepository from "../../../repositories/emailSetting.repository";
import EmailSetttingService from "../../../services/dashboard/emailSetting.service";

const router = Router();
const emailSettingRepository = new EmailSettingRepository();
const emailSettingService = new EmailSetttingService(emailSettingRepository);
const emailSettingController = new EmailSettingController(emailSettingService);

router
	.route("/")
	.get([
		checkPermission("email-setting", "read"),
		controllerAsync((request, response) =>
			emailSettingController.getEmailSetting(request, response),
		),
	])
	.put([
		saveHistory("email setting"),
		checkPermission("email-setting", "update"),
		controllerAsyncWithTransaction((request, response, session) =>
			emailSettingController.updateEmailSetting(request, response, session),
		),
	]);

router
	.route("/test")
	.post([
		saveHistory("email setting"),
		controllerAsync((request, response) =>
			emailSettingController.testEmail(request, response),
		),
	]);

export default router;
