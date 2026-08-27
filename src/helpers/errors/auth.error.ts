import { HttpStatus } from "../../config/http.config";
import { HttpError } from "./http.error";

export class UnauthenticatedError extends HttpError {
	constructor(message: string = "Unauthenticated") {
		super(HttpStatus.UNAUTHORIZED, message);
		this.name = this.constructor.name;
		Error.captureStackTrace?.(this, this.constructor);
	}
}
