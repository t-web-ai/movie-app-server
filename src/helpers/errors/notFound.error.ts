import { HttpStatus } from "../../config/http.config";
import { HttpError } from "./http.error";

export class NotFoundError extends HttpError {
	constructor(message: string = "Resource not found") {
		super(HttpStatus.NOT_FOUND, message);
		this.name = this.constructor.name;
		Error.captureStackTrace?.(this, this.constructor);
	}
}
