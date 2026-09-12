import type { Request, Response } from "express";
import type { ClientSession } from "mongoose";
import { successResponse } from "../../helpers/response.helper";
import type MovieService from "../../services/dashboard/movie.service";
import {
	buildMovieFilter,
	MovieFilterSchema,
} from "../../utils/filters/movie.filter";
import { validateSchema } from "../../utils/validate.util";
import { MovieCreateSchema } from "./../../validators/schemas/movie.schema";
import { MovieUpdateSchema } from "../../validators/schemas/movie.schema";
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
			message: "Get all movies successfully",
			data,
		});
	}

	async getSingleMovie(request: Request, response: Response) {
		const { params } = request;
		const { id } = validateSchema(IdSchema, params);
		const data = await this.movieService.getSingleMovie(id);

		return successResponse({
			response,
			message: "Get a movie successfully",
			data,
		});
	}

	async deleteMovie(
		request: Request,
		response: Response,
		session: ClientSession,
	) {
		const { params } = request;
		const { id } = validateSchema(IdSchema, params);
		const data = await this.movieService.deleteMovie(id, session);

		return successResponse({
			response,
			message: "Delete movie successfully",
			data,
		});
	}

	async updateMovie(
		request: Request,
		response: Response,
		session: ClientSession,
	) {
		const { body, file, params } = request;
		const movieUpdateInput = validateSchema(MovieUpdateSchema, body);
		const { id } = validateSchema(IdSchema, params);
		const data = await this.movieService.updateMovie({
			id,
			movieUpdateInput,
			file,
			session,
		});

		return successResponse({
			response,
			message: "Update movie successfully",
			data,
		});
	}

	async createMovie(
		request: Request,
		response: Response,
		session: ClientSession,
	) {
		const { body, file } = request;
		const movieCreateInput = validateSchema(MovieCreateSchema, body);
		const data = await this.movieService.createMovie({
			movieCreateInput,
			file,
			session,
		});

		return successResponse({
			response,
			message: "Create movie successfully",
			data,
		});
	}
}

export default MovieController;
