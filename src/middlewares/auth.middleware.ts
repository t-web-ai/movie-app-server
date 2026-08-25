import { RequestHandler } from "express";
import { HttpStatus } from "../config/http.config";
import { errorResponse } from "../helpers/response.helper";
import { verifyToken } from "../utils/jwt.util";
import { AuthUserSchema } from "../validators/schemas/auth.schema";

export const authMiddleware: RequestHandler = (request, response, next) => {
  const authHeader = request.headers.authorization;
  if (!authHeader?.startsWith("Bearer ")) {
    return errorResponse({
      response,
      message: "Unauthorized",
      status: HttpStatus.UNAUTHORIZED,
      details: "Bearer token is not found",
    });
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    return errorResponse({
      response,
      message: "Unauthorized",
      status: HttpStatus.UNAUTHORIZED,
      details: "Token is not provided",
    });
  }

  const payload = verifyToken(token);
  const { data, success, error } = AuthUserSchema.safeParse(payload);
  if (!success) {
    throw error;
  }
  request.user = data;
  next();
};
