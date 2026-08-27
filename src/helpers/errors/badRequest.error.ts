import { HttpStatus, type HttpStatusCode } from "../../config/http.config";
import { HttpError } from "./http.error";

export class BadRequestError extends HttpError {
	constructor(
		message: string = "Bad Request",
		errorCode: HttpStatusCode = HttpStatus.BAD_REQUEST,
	) {
		super(errorCode, message);
		this.name = this.constructor.name;
		Error.captureStackTrace?.(this, this.constructor);
	}
}
