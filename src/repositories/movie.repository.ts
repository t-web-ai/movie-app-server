import type { ClientSession, QueryFilter } from "mongoose";
import { Movie } from "../db/models";
import type { MovieDocument, MovieSchemaType } from "../db/models/movie.model";
import type {
	MovieCreateInput,
	MovieUpdateInput,
} from "../validators/schemas/movie.schema";
import type { PaginationInput } from "../validators/schemas/pagination.schema";

class MovieRepository {
	async getAllMovies(
		filter: QueryFilter<MovieSchemaType>,
		paginationInput: PaginationInput,
	) {
		const movies = await Movie.find(filter)
			.skip((paginationInput.page - 1) * paginationInput.limit)
			.limit(paginationInput.limit)
			.populate("casts", "-createdAt -updatedAt -__v")
			.populate("directors", "-createdAt -updatedAt -__v")
			.populate("genres", "-createdAt -updatedAt -__v")
			.lean();

		return movies;
	}

	async getAllMoviesCount(filter: QueryFilter<MovieSchemaType>) {
		return await Movie.countDocuments(filter);
	}

	async getMovie(filter: QueryFilter<MovieDocument>) {
		const movie = await Movie.findOne(filter)
			.populate("casts", "-createdAt -updatedAt -__v")
			.populate("directors", "-createdAt -updatedAt -__v")
			.populate("genres", "-createdAt -updatedAt -__v");
		return movie;
	}

	async createMovie(
		movieCreateInput: MovieCreateInput,
		session: ClientSession,
	) {
		const movie = new Movie(movieCreateInput);
		await movie.save({ session });

		return movie;
	}

	async findMovieAndUpdate(
		filter: QueryFilter<MovieDocument>,
		movieUpdateInput: MovieUpdateInput,
		session: ClientSession,
	) {
		const movie = await Movie.findOneAndUpdate(filter, movieUpdateInput, {
			session,
			returnDocument: "after",
		});
		return movie;
	}

	async findMovieAndDelete(
		filter: QueryFilter<MovieDocument>,
		session: ClientSession,
	) {
		return await Movie.findOneAndDelete(filter, { session });
	}

	async saveMovie(movie: MovieDocument, session: ClientSession) {
		return await movie.save({ session });
	}
}

export default MovieRepository;
