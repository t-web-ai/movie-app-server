import type { QueryFilter } from "mongoose";
import {
	Genre,
	type GenreDocument,
	type GenreSchemaType,
} from "../db/models/genre.model";
import type {
	GenreCreateInput,
	GenreUpdateInput,
} from "../validators/schemas/genre.schema";
import type { PaginationInput } from "../validators/schemas/pagination.schema";

class GenreRepository {
	async createGenre(genreCreateInput: GenreCreateInput) {
		const genre = new Genre(genreCreateInput);
		await genre.save();
		return genre;
	}

	async updateGenre(
		filter: QueryFilter<GenreDocument>,
		data: GenreUpdateInput,
	) {
		const genre = await Genre.findOneAndUpdate(filter, data, {
			returnDocument: "after",
		});
		return genre;
	}

	async getAllGenres(
		filter: QueryFilter<GenreSchemaType>,
		paginationInput: PaginationInput,
	) {
		const genres = await Genre.find(filter)
			.skip((paginationInput.page - 1) * paginationInput.limit)
			.limit(paginationInput.limit)
			.lean();

		return genres;
	}

	async getAllGenresCount(filter: QueryFilter<GenreSchemaType>) {
		return await Genre.countDocuments(filter);
	}

	async deleteGenre(filter: QueryFilter<GenreDocument>) {
		return await Genre.findOneAndDelete(filter);
	}
}

export default GenreRepository;
