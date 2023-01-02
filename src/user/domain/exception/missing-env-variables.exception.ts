import { HttpCode } from '../repository/entity/http-code.entity';

export class MissingEnvVariablesException extends Error {
  public readonly statusCode?: HttpCode;
  public readonly isOperational: boolean;

  constructor(name: string) {
    super(`Missing env variable ${name} to boostrap server`);
    Object.setPrototypeOf(this, new.target.prototype);

    this.isOperational = false;
    this.statusCode = HttpCode.INTERNAL_SERVER_ERROR;

    Error.captureStackTrace(this);
  }
}
