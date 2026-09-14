import { Router } from "express";
import GenreController from "../../../controllers/dashboard/genre.controller";
import { controllerAsync } from "../../../middlewares/handlers/controllerAsync.handler";
import { checkPermission } from "../../../middlewares/permission.middleware";
import GenreRepository from "../../../repositories/genre.repository";
import GenreService from "../../../services/dashboard/genre.service";

const router = Router();
const genreRepository = new GenreRepository();
const genreService = new GenreService(genreRepository);
const gerneController = new GenreController(genreService);

router
	.route("/")
	.post([
		checkPermission("genre", "create"),
		controllerAsync((request, response) =>
			gerneController.createGenre(request, response),
		),
	])
	.get([
		checkPermission("genre", "read"),
		controllerAsync((request, response) =>
			gerneController.getAllGenres(request, response),
		),
	]);

router
	.route("/:id")
	.put([
		checkPermission("genre", "update"),
		controllerAsync((request, response) =>
			gerneController.updateGenre(request, response),
		),
	])
	.delete([
		checkPermission("genre", "delete"),
		controllerAsync((request, response) =>
			gerneController.deleteGenre(request, response),
		),
	]);

export default router;
