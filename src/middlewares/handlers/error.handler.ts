import type { ErrorRequestHandler } from "express";
import { JsonWebTokenError } from "jsonwebtoken";
import { MongooseError, mongo } from "mongoose";
import { MulterError } from "multer";
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
	if (
		(error instanceof mongo.MongoServerError ||
			error instanceof mongo.MongoError) &&
		error.code === 11000
	) {
		const keyValue = (error as mongo.MongoServerError).keyValue;
		const field = keyValue ? Object.keys(keyValue)[0] : "field";
		const value = keyValue ? keyValue[field] : "";

		return errorResponse({
			response,
			status: HttpStatus.CONFLICT,
			message: "Duplicate Key Error",
			details: [
				{
					field,
					message: `The ${field} '${value}' already exists.`,
				},
			],
		});
	}
	if (error instanceof MongooseError) {
		return errorResponse({
			response,
			status: HttpStatus.BAD_REQUEST,
			message: error.name,
			details: error.message,
		});
	}
	if (error instanceof MulterError) {
		return errorResponse({
			response,
			status: HttpStatus.BAD_REQUEST,
			message: error.name,
			details: {
				field: error.field,
				message: error.message,
			},
		});
	}
	return errorResponse({
		response,
		status: HttpStatus.INTERNAL_SERVER_ERROR,
		message: error.name,
		details: "Something went wrong",
	});
};
