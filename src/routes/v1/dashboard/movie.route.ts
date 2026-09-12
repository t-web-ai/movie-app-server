import { Router } from "express";
import MovieController from "../../../controllers/dashboard/movie.controller";
import {
	controllerAsync,
	controllerAsyncWithTransaction,
} from "../../../middlewares/handlers/controllerAsync.handler";
import { uploadImage } from "../../../middlewares/upload.middleware";
import MovieRepository from "../../../repositories/movie.repository";
import MovieService from "../../../services/dashboard/movie.service";

const router = Router();
const movieRepository = new MovieRepository();
const movieService = new MovieService(movieRepository);
const movieController = new MovieController(movieService);

router
	.route("/")
	.get([
		controllerAsync((request, response) =>
			movieController.getAllMovies(request, response),
		),
	])
	.post([
		uploadImage.single("image"),
		controllerAsyncWithTransaction((request, response, session) =>
			movieController.createMovie(request, response, session),
		),
	]);

router
	.route("/:id")
	.get([
		controllerAsync((request, response) =>
			movieController.getSingleMovie(request, response),
		),
	])
	.put([
		uploadImage.single("image"),
		controllerAsyncWithTransaction((request, response, session) =>
			movieController.updateMovie(request, response, session),
		),
	])
	.delete([
		controllerAsyncWithTransaction((request, response, session) =>
			movieController.deleteMovie(request, response, session),
		),
	]);

export default router;
