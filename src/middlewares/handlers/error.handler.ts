import type { ErrorRequestHandler } from "express";
import { JsonWebTokenError } from "jsonwebtoken";
import { treeifyError, ZodError } from "zod";
import { HttpStatus } from "../../config/http.config";
import { HttpError } from "../../helpers/errors/http.error";
import { errorResponse } from "../../helpers/response.helper";

export const errorHandler: ErrorRequestHandler = (
	error,
	request,
	response,
	_next,
) => {
	if (error instanceof HttpError) {
		return errorResponse({
			response,
			status: error.status,
			message: error.name,
			details: [
				{
					field: request.url,
					message: error.message,
				},
			],
		});
	}
	if (error instanceof ZodError) {
		return errorResponse({
			response,
			status: HttpStatus.BAD_REQUEST,
			message: error.name,
			details: treeifyError(error),
		});
	}
	if (error instanceof JsonWebTokenError) {
		return errorResponse({
			response,
			status: HttpStatus.BAD_REQUEST,
			message: error.name,
			details: error.message,
		});
	}
};
