import { Router } from "express";
import MovieController from "../../../controllers/website/movie.controller";
import {
	controllerAsync,
	controllerAsyncWithTransaction,
} from "../../../middlewares/handlers/controllerAsync.handler";
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
	]);

router
	.route("/popular")
	.get([
		controllerAsync((request, response) =>
			movieController.getPopularMovies(request, response),
		),
	]);

router
	.route("/:id")
	.get([
		controllerAsyncWithTransaction((request, response, session) =>
			movieController.getSingleMovie(request, response, session),
		),
	]);

export default router;
