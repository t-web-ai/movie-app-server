import { Response } from "express";
import { HttpStatus, HttpStatusCode } from "../config/http.config";

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
  details?: any;
}

export interface ErrorResponseOptions {
  response: Response;
  message?: string;
  status?: HttpStatusCode;
  details: any;
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
