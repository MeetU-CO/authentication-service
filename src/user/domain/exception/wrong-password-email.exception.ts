import { HttpCode } from '../repository/entity/http-code.entity';

export class WrongPasswordOrEmailException extends Error {
  public readonly isOperational: boolean;
  public readonly statusCode?: HttpCode;

  constructor() {
    super('Password or email is wrong');
    Object.setPrototypeOf(this, new.target.prototype);

    this.isOperational = true;
    this.statusCode = HttpCode.UNAUTHORIZED;

    Error.captureStackTrace(this);
  }
}
