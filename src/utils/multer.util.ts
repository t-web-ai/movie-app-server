import type { Request } from "express";
import multer, { type FileFilterCallback } from "multer";
import { BadRequestError } from "../helpers/errors/badRequest.error";

const memoryStorage = multer.memoryStorage();

export function createUploader({
	allowedFileTypes,
	maxFileSize,
}: {
	allowedFileTypes: string[];
	maxFileSize: number;
}) {
	return multer({
		storage: memoryStorage,
		fileFilter: createFileFilter({ allowedFileTypes }),
		limits: {
			fileSize: maxFileSize * 1024 * 1024,
		},
	});
}

export function createFileFilter({
	allowedFileTypes,
}: {
	allowedFileTypes: string[];
}) {
	return (
		_request: Request,
		file: Express.Multer.File,
		cb: FileFilterCallback,
	) => {
		if (!allowedFileTypes.includes(file.mimetype)) {
			return cb(
				new BadRequestError(
					`Invalid file type. Allowed: [${allowedFileTypes}]`,
				),
			);
		}
		cb(null, true);
	};
}
