import { HttpCode } from '../repository/entity/http-code.entity';

export class UserNotFoundException extends Error {
  public readonly httpCode?: HttpCode;
  public readonly isOperational: boolean;

  constructor() {
    super('User with that email not found');
    Object.setPrototypeOf(this, new.target.prototype);

    this.isOperational = true;
    this.httpCode = HttpCode.NOT_FOUND;

    Error.captureStackTrace(this);
  }
}
