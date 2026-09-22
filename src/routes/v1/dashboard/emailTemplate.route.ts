import { Router } from "express";
import EmailTemplateController from "../../../controllers/dashboard/emailTemplate.controller";
import {
	controllerAsync,
	controllerAsyncWithTransaction,
} from "../../../middlewares/handlers/controllerAsync.handler";
import { saveHistory } from "../../../middlewares/history.middleware";
import { checkPermission } from "../../../middlewares/permission.middleware";
import EmailTemplateRepository from "../../../repositories/emailTemplate.repository";
import EmailTemplateService from "../../../services/dashboard/emailTemplate.service";

const router = Router();
const emailTemplateRepository = new EmailTemplateRepository();
const emailTemplateService = new EmailTemplateService(emailTemplateRepository);
const emailTemplateController = new EmailTemplateController(
	emailTemplateService,
);

router
	.route("/")
	.all([checkPermission("email-template")])
	.get([
		controllerAsync((request, response) =>
			emailTemplateController.getAllEmailTemplates(request, response),
		),
	]);

router
	.route("/:id")
	.all([checkPermission("email-template")])
	.get([
		controllerAsync((request, response) =>
			emailTemplateController.getSingleEmailTemplate(request, response),
		),
	])
	.put([
		saveHistory("email template"),
		controllerAsyncWithTransaction((request, response, session) =>
			emailTemplateController.updateEmailTemplate(request, response, session),
		),
	]);

export default router;
