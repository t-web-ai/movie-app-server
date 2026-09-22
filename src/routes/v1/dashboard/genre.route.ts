import { Router } from "express";
import GenreController from "../../../controllers/dashboard/genre.controller";
import { controllerAsync } from "../../../middlewares/handlers/controllerAsync.handler";
import { saveHistory } from "../../../middlewares/history.middleware";
import { checkPermission } from "../../../middlewares/permission.middleware";
import GenreRepository from "../../../repositories/genre.repository";
import GenreService from "../../../services/dashboard/genre.service";

const router = Router();
const genreRepository = new GenreRepository();
const genreService = new GenreService(genreRepository);
const gerneController = new GenreController(genreService);

router
	.route("/")
	.all([checkPermission("genre")])
	.post([
		saveHistory("genre"),
		controllerAsync((request, response) =>
			gerneController.createGenre(request, response),
		),
	])
	.get([
		controllerAsync((request, response) =>
			gerneController.getAllGenres(request, response),
		),
	]);

router
	.route("/:id")
	.all(checkPermission("genre"))
	.put([
		saveHistory("genre"),
		controllerAsync((request, response) =>
			gerneController.updateGenre(request, response),
		),
	])
	.delete([
		saveHistory("genre"),
		controllerAsync((request, response) =>
			gerneController.deleteGenre(request, response),
		),
	]);

export default router;
