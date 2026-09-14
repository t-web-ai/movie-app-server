import { Router } from "express";
import TalentController from "../../../controllers/dashboard/tanlent.controller";
import {
	controllerAsync,
	controllerAsyncWithTransaction,
} from "../../../middlewares/handlers/controllerAsync.handler";
import { checkPermission } from "../../../middlewares/permission.middleware";
import { uploadImage } from "../../../middlewares/upload.middleware";
import TalentRepository from "../../../repositories/talent.repository";
import TalentService from "../../../services/dashboard/talent.service";

const router = Router();
const talentRepository = new TalentRepository();
const talentService = new TalentService(talentRepository);
const talentController = new TalentController(talentService);

router
	.route("/")
	.get([
		checkPermission("talent", "read"),
		controllerAsync((request, response) =>
			talentController.getAllTalents(request, response),
		),
	])
	.post([
		checkPermission("talent", "create"),
		uploadImage.single("image"),
		controllerAsyncWithTransaction((request, response, session) =>
			talentController.createTalent(request, response, session),
		),
	]);

router
	.route("/:id")
	.put([
		checkPermission("talent", "update"),
		uploadImage.single("image"),
		controllerAsyncWithTransaction((request, response, session) =>
			talentController.updateTalent(request, response, session),
		),
	])
	.delete([
		checkPermission("talent", "delete"),
		controllerAsyncWithTransaction((request, response, session) =>
			talentController.deleteTalent(request, response, session),
		),
	]);

export default router;
