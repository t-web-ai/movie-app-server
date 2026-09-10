import type { Request, Response } from "express";
import { successResponse } from "../../helpers/response.helper";
import type GenreService from "../../services/dashboard/genre.service";
import {
	buildGenreFilter,
	GenreFilterSchema,
} from "../../utils/filters/genre.filter";
import { validateSchema } from "../../utils/validate.util";
import {
	GenreCreateSchema,
	GenreUpdateSchema,
} from "../../validators/schemas/genre.schema";
import { PaginationSchema } from "../../validators/schemas/pagination.schema";
import { IdSchema } from "../../validators/schemas/param.schema";

class GenreController {
	constructor(private readonly genreService: GenreService) {}
	async createGenre(request: Request, response: Response) {
		const { body } = request;
		const genreCreateInput = validateSchema(GenreCreateSchema, body);
		const data = await this.genreService.createGenre(genreCreateInput);

		return successResponse({
			response,
			message: "Create genre successfully",
			data,
		});
	}

	async updateGenre(request: Request, response: Response) {
		const { body, params } = request;
		const genreUpdateInput = validateSchema(GenreUpdateSchema, body);
		const { id } = validateSchema(IdSchema, params);

		const data = await this.genreService.updateGenre(
			{ _id: id },
			genreUpdateInput,
		);

		return successResponse({
			response,
			message: "Update genre successfully",
			data,
		});
	}

	async getAllGenres(request: Request, response: Response) {
		const { query } = request;
		const filterInput = validateSchema(GenreFilterSchema, query);
		const filter = buildGenreFilter(filterInput);
		const paginationInput = validateSchema(PaginationSchema, query);

		const data = await this.genreService.getAllGenres(filter, paginationInput);

		return successResponse({
			response,
			message: "Get all genres successfully",
			data,
		});
	}

	async deleteGenre(request: Request, response: Response) {
		const { params } = request;
		const { id } = validateSchema(IdSchema, params);
		const data = await this.genreService.deleteGenre({ _id: id });

		return successResponse({
			response,
			message: "Delete genre successfully",
			data,
		});
	}
}

export default GenreController;
