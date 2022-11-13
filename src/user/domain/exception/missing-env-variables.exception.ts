import { HttpCode } from '../repository/entity/http-code.entity';

export class MissingEnvVariablesException extends Error {
  public readonly httpCode?: HttpCode;
  public readonly isOperational: boolean;

  constructor() {
    super('Missing env variables to boostrap server');
    Object.setPrototypeOf(this, new.target.prototype);

    this.isOperational = false;
    this.httpCode = HttpCode.INTERNAL_SERVER_ERROR;

    Error.captureStackTrace(this);
  }
}
