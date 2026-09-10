import { Router } from "express";
import TalentController from "../../../controllers/dashboard/tanlent.controller";
import {
	controllerAsync,
	controllerAsyncWithTransaction,
} from "../../../middlewares/handlers/controllerAsync.handler";
import { uploadImage } from "../../../middlewares/upload.middleware";
import TalentRepository from "../../../repositories/dashboard/talent.repository";
import TalentService from "../../../services/dashboard/talent.service";

const router = Router();
const talentRepository = new TalentRepository();
const talentService = new TalentService(talentRepository);
const talentController = new TalentController(talentService);

router
	.route("/")
	.get([
		controllerAsync((request, response) =>
			talentController.getAllTalents(request, response),
		),
	])
	.post([
		uploadImage.single("image"),
		controllerAsyncWithTransaction((request, response, session) =>
			talentController.createTalent(request, response, session),
		),
	]);

router
	.route("/:id")
	.put([
		uploadImage.single("image"),
		controllerAsyncWithTransaction((request, response, session) =>
			talentController.updateTalent(request, response, session),
		),
	])
	.delete([
		controllerAsyncWithTransaction((request, response, session) =>
			talentController.deleteTalent(request, response, session),
		),
	]);

export default router;
