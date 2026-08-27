import { HttpStatus } from "../../config/http.config";
import { HttpError } from "./http.error";

export class AlreadyExistsError extends HttpError {
	constructor(message: string = "Resource already exists") {
		super(HttpStatus.CONFLICT, message);
		this.name = this.constructor.name;
		Error.captureStackTrace?.(this, this.constructor);
	}
}
