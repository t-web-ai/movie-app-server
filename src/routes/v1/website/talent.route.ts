import { Router } from "express";
import TalentController from "../../../controllers/website/talent.controller";
import { controllerAsync } from "../../../middlewares/handlers/controllerAsync.handler";
import TalentRepository from "../../../repositories/talent.repository";
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
	]);

router
	.route("/:id")
	.get([
		controllerAsync((request, response) =>
			talentController.getTalentDetails(request, response),
		),
	]);

export default router;
