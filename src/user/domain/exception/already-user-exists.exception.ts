import { HttpCode } from '../repository/entity/http-code.entity';

export class AlreadyUserExistsException extends Error {
  public readonly httpCode?: HttpCode;
  public readonly isOperational: boolean;

  constructor() {
    super('User already exists with that email address');
    Object.setPrototypeOf(this, new.target.prototype);

    this.isOperational = true;
    this.httpCode = HttpCode.ALREADY_EXISTS;

    Error.captureStackTrace(this);
  }
}
