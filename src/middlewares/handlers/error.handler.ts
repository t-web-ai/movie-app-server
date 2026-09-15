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
	console.log(error);
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

	// nodemailer errors handling
	switch (error.code) {
		// 400 Bad Request
		case "EENVELOPE":
		case "EMAXRECIPIENTS":
		case "EFILEACCESS":
		case "EURLACCESS":
			return errorResponse({
				response,
				status: HttpStatus.BAD_REQUEST,
				message: error.message || "Invalid email payload or parameters.",
			});

		// 401 Unauthorized
		case "EAUTH":
		case "ENOAUTH":
		case "EOAUTH2":
			return errorResponse({
				response,
				status: HttpStatus.UNAUTHORIZED,
				message: "Email service authentication failed.",
			});

		// 503 Service Unavailable
		case "ECONNECTION":
		case "ETIMEDOUT":
		case "ESOCKET":
			return errorResponse({
				response,
				status: HttpStatus.SERVICE_UNAVAILABLE,
				message: "Mail service temporary unreachable. Please try again later.",
			});

		// 500 Internal Server Error
		case "ECONFIG":
		case "EDNS":
		case "ETLS":
		case "EREQUIRETLS":
			return errorResponse({
				response,
				status: HttpStatus.INTERNAL_SERVER_ERROR,
				message: "An error occurred while sending the email.",
			});
	}

	return errorResponse({
		response,
		status: HttpStatus.INTERNAL_SERVER_ERROR,
		message: "Internal server error",
		details: "Something went wrong",
	});
};
