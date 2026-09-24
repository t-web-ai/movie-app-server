import type { Request, Response } from "express";
import type { ClientSession } from "mongoose";
import { successResponse } from "../../helpers/response.helper";
import type MovieService from "../../services/dashboard/movie.service";
import {
	buildMovieFilter,
	MovieFilterSchema,
} from "../../utils/filters/movie.filter";
import { validateSchema } from "../../utils/validate.util";
import { PaginationSchema } from "../../validators/schemas/pagination.schema";
import { IdSchema } from "../../validators/schemas/param.schema";

class MovieController {
	constructor(private readonly movieService: MovieService) {}
	async getAllMovies(request: Request, response: Response) {
		const { query } = request;
		const filterInput = validateSchema(MovieFilterSchema, query);
		const filter = await buildMovieFilter(filterInput);
		const paginationInput = validateSchema(PaginationSchema, query);

		const data = await this.movieService.getAllMovies(filter, paginationInput);

		return successResponse({
			response,
			message: "Gel all movies successfully",
			data,
		});
	}

	async getSingleMovie(
		request: Request,
		response: Response,
		session: ClientSession,
	) {
		const { params } = request;
		const { id } = validateSchema(IdSchema, params);

		const data = await this.movieService.getSingleMovieDetails(id, session);

		return successResponse({
			response,
			message: "Get a movie successfully",
			data,
		});
	}

	async getPopularMovies(request: Request, response: Response) {
		const { query } = request;
		const filterInput = validateSchema(MovieFilterSchema, query);
		const filter = await buildMovieFilter(filterInput);
		const data = await this.movieService.getPopularMovies(filter);
		return successResponse({
			response,
			message: "Get popular movies successfully",
			data,
		});
	}
}

export default MovieController;
