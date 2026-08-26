import type { Response } from "express";
import { HttpStatus, type HttpStatusCode } from "../config/http.config";

// --- SUCCESS RESPONSE ---

export type SuccessResponseOptions<T = unknown> = {
	response: Response;
	message: string;
	data?: T;
	status?: HttpStatusCode;
};

export function successResponse<T>({
	response,
	message,
	data,
	status = HttpStatus.OK,
}: SuccessResponseOptions<T>): Response {
	return response.status(status).json({
		success: true,
		message,
		...(data && { data }),
	});
}

// --- ERROR RESPONSE ---

export interface ErrorDetail {
	field?: string;
	message: string;
}

export interface ErrorResponse {
	success: false;
	status: number;
	message: string;
	details?: unknown;
}

export interface ErrorResponseOptions {
	response: Response;
	message?: string;
	status?: HttpStatusCode;
	details: unknown;
	bodyStatus?: number;
}

export const errorResponse = ({
	response,
	message = "An unexpected error occurred",
	status = HttpStatus.INTERNAL_SERVER_ERROR,
	details,
	bodyStatus,
}: ErrorResponseOptions): Response => {
	const responseObject: ErrorResponse = {
		success: false,
		status: bodyStatus ?? status,
		message,
		details,
	};
	return response.status(status).json(responseObject);
};
