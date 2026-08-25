import { HttpStatusCode } from "../../config/http.config";

export class HttpError extends Error {
  constructor(
    public readonly status: HttpStatusCode,
    message: string,
  ) {
    super(message);
    this.name = this.constructor.name;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
