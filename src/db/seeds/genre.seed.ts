import type { ClientSession } from "mongoose";
import logger from "../../utils/logger.util";
import type { GenreCreateInput } from "../../validators/schemas/genre.schema";
import { Genre } from "../models/genre.model";

const genres: GenreCreateInput[] = [
	{ name: "Action" },
	{ name: "Adventure" },
	{ name: "Animation" },
	{ name: "Comedy" },
	{ name: "Crime" },
	{ name: "Documentary" },
	{ name: "Drama" },
	{ name: "Family" },
	{ name: "Fantasy" },
	{ name: "History" },
	{ name: "Horror" },
	{ name: "Music" },
	{ name: "Mystery" },
	{ name: "Romance" },
	{ name: "Science Fiction" },
	{ name: "Thriller" },
	{ name: "War" },
	{ name: "Western" },
	{ name: "Musical" },
	{ name: "Biography" },
	{ name: "Sport" },
	{ name: "Superhero" },
	{ name: "Psychological" },
	{ name: "Historical" },
];

export async function seedGenre(session: ClientSession) {
	logger.info("seeding the genres data");
	await Genre.insertMany(genres, { session });
	logger.info("the genres data are seeeded successfully");
}

export async function deleteGenre(session: ClientSession) {
	await Genre.deleteMany({}, { session });
}
