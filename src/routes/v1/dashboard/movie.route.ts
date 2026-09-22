import { Router } from "express";
import MovieController from "../../../controllers/dashboard/movie.controller";
import {
	controllerAsync,
	controllerAsyncWithTransaction,
} from "../../../middlewares/handlers/controllerAsync.handler";
import { saveHistory } from "../../../middlewares/history.middleware";
import { checkPermission } from "../../../middlewares/permission.middleware";
import { uploadImage } from "../../../middlewares/upload.middleware";
import MovieRepository from "../../../repositories/movie.repository";
import MovieService from "../../../services/dashboard/movie.service";

const router = Router();
const movieRepository = new MovieRepository();
const movieService = new MovieService(movieRepository);
const movieController = new MovieController(movieService);

router
	.route("/")
	.all([checkPermission("movie")])
	.get([
		controllerAsync((request, response) =>
			movieController.getAllMovies(request, response),
		),
	])
	.post([
		saveHistory("movie"),
		uploadImage.single("image"),
		controllerAsyncWithTransaction((request, response, session) =>
			movieController.createMovie(request, response, session),
		),
	]);

router
	.route("/:id")
	.all([checkPermission("movie")])
	.get([
		controllerAsync((request, response) =>
			movieController.getSingleMovie(request, response),
		),
	])
	.put([
		saveHistory("movie"),
		uploadImage.single("image"),
		controllerAsyncWithTransaction((request, response, session) =>
			movieController.updateMovie(request, response, session),
		),
	])
	.delete([
		saveHistory("movie"),
		controllerAsyncWithTransaction((request, response, session) =>
			movieController.deleteMovie(request, response, session),
		),
	]);

export default router;
