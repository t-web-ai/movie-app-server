import type { QueryFilter } from "mongoose";
import type {
	GenreDocument,
	GenreSchemaType,
} from "../../db/models/genre.model";
import { BadRequestError } from "../../helpers/errors/badRequest.error";
import { NotFoundError } from "../../helpers/errors/notFound.error";
import type GenreRepository from "../../repositories/genre.repository";
import type {
	GenreCreateInput,
	GenreUpdateInput,
} from "../../validators/schemas/genre.schema";
import type { PaginationInput } from "../../validators/schemas/pagination.schema";

class GenreService {
	constructor(private readonly genreRepository: GenreRepository) {}
	async createGenre(genreCreateInput: GenreCreateInput) {
		const genre = await this.genreRepository.createGenre(genreCreateInput);
		if (!genre) throw new BadRequestError("Failed to create genre");

		return { genre };
	}

	async updateGenre(
		filter: QueryFilter<GenreDocument>,
		genreUpdateInput: GenreUpdateInput,
	) {
		const genre = await this.genreRepository.updateGenre(
			filter,
			genreUpdateInput,
		);
		if (!genre) throw new BadRequestError("Faild to update genre");

		return { genre };
	}

	async getAllGenres(
		filter: QueryFilter<GenreSchemaType>,
		paginationInput: PaginationInput,
	) {
		const [genres, totalCount] = await Promise.all([
			this.genreRepository.getAllGenres(filter, paginationInput),
			this.genreRepository.getAllGenresCount(filter),
		]);

		const totalPages = Math.ceil(totalCount / paginationInput.limit);

		return {
			genres,
			pagination: {
				foundCount: genres.length,
				totalCount,
				totalPages,
				pages: paginationInput.page,
				limit: paginationInput.limit,
			},
		};
	}

	async deleteGenre(filter: QueryFilter<GenreDocument>) {
		const genre = await this.genreRepository.deleteGenre(filter);
		if (!genre) throw new NotFoundError("No genre");

		return { genre };
	}
}

export default GenreService;
