import { CustomError } from "./custom-error";

export class DatabaseConnectionError extends CustomError {
  reason = "Error connecting to database3";
  statusCode = 500;

  constructor() {
    super("Error connecting to database2");

    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }

  serializeErrors() {
    return [{ message: this.reason }, { message: "Database internal error" }];
  }
}
