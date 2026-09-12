import type z from "zod";

export const ALLOWED_IMAGE_TYPES: z.core.util.MimeTypes[] = [
	"image/webp",
	"image/png",
	"image/jpeg",
];
export const LIMIT_IMAGE_SIZE = 0.1;
export const TALENT_FILE_PATH = "/talents";
export const MOVIE_FILE_PATH = "/movies";
