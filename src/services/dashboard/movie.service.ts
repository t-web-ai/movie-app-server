import type { ClientSession, QueryFilter, Types } from "mongoose";
import { MOVIE_FILE_PATH } from "../../common/constants";
import env from "../../config/env.config";
import type { MovieSchemaType } from "../../db/models/movie.model";
import { BadRequestError } from "../../helpers/errors/badRequest.error";
import { NotFoundError } from "../../helpers/errors/notFound.error";
import type MovieRepository from "../../repositories/movie.repository";
import { deleteSingleFile, uploadSingleFile } from "../../utils/file.util";
import type {
	MovieCreateInput,
	MovieUpdateInput,
} from "../../validators/schemas/movie.schema";
import type { PaginationInput } from "../../validators/schemas/pagination.schema";

class MovieService {
	constructor(private readonly movieRepository: MovieRepository) {}
	async getAllMovies(
		filter: QueryFilter<MovieSchemaType>,
		paginationInput: PaginationInput,
	) {
		const [movies, totalCount] = await Promise.all([
			this.movieRepository.getAllMovies(filter, paginationInput),
			this.movieRepository.getAllMoviesCount(filter),
		]);

		const totalPages = Math.ceil(totalCount / paginationInput.limit);
		return {
			movies,
			paginatin: {
				foundCount: movies.length,
				totalCount,
				totalPages,
				page: paginationInput.page,
				limit: paginationInput.limit,
			},
			fileLocation: {
				movie: `${env.FILE_LOCATION}${MOVIE_FILE_PATH}`,
			},
		};
	}

	async getSingleMovie(id: Types.ObjectId) {
		const movie = await this.movieRepository.getMovie({ _id: id });
		if (!movie) throw new NotFoundError("No movie");

		return { movie };
	}

	async createMovie({
		movieCreateInput,
		file,
		session,
	}: {
		movieCreateInput: MovieCreateInput;
		file?: Express.Multer.File;
		session: ClientSession;
	}) {
		const movie = await this.movieRepository.createMovie(
			movieCreateInput,
			session,
		);
		if (!movie) throw new BadRequestError("Failed to create movie");

		if (file) {
			const image = await uploadSingleFile({ file, path: MOVIE_FILE_PATH });

			if (!image) throw new BadRequestError("Failed to upload image");

			movie.image = {
				file: image.name,
				fileId: image.fileId,
			};

			await this.movieRepository.saveMovie(movie, session);
		}

		return { movie };
	}

	async updateMovie({
		id,
		movieUpdateInput,
		file,
		session,
	}: {
		id: Types.ObjectId;
		movieUpdateInput: MovieUpdateInput;
		file?: Express.Multer.File;
		session: ClientSession;
	}) {
		const movie = await this.movieRepository.findMovieAndUpdate(
			{ _id: id },
			movieUpdateInput,
			session,
		);

		if (!movie) throw new BadRequestError("Failed to update movie");

		if (file) {
			const image = await uploadSingleFile({
				file,
				path: MOVIE_FILE_PATH,
				fileId: movie.image?.fileId,
			});

			if (!image) throw new BadRequestError("Failed to upload image");

			movie.image = {
				file: image.name,
				fileId: image.fileId,
			};

			await this.movieRepository.saveMovie(movie, session);
		}

		return { movie };
	}

	async deleteMovie(id: Types.ObjectId, session: ClientSession) {
		const movie = await this.movieRepository.findMovieAndDelete(
			{ _id: id },
			session,
		);
		if (!movie) throw new NotFoundError("No movie");

		if (movie.image?.fileId) await deleteSingleFile(movie.image.fileId);
		return { movie };
	}
}

export default MovieService;
