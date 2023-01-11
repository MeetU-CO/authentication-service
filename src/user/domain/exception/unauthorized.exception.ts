import { HttpCode } from '../repository/entity/http-code.entity';

export class UnauthorizedException extends Error {
  public readonly statusCode?: HttpCode;
  public readonly isOperational: boolean;

  constructor() {
    super('Error user not authorized');
    Object.setPrototypeOf(this, new.target.prototype);

    this.isOperational = true;
    this.statusCode = HttpCode.UNAUTHORIZED;

    Error.captureStackTrace(this);
  }
}
