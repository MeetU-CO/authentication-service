import { HttpCode } from '../repository/entity/http-code.entity';

export class WrongPasswordOrEmailException extends Error {
  public readonly httpCode?: HttpCode;
  public readonly isOperational: boolean;

  constructor() {
    super('Password or email is wrong');
    Object.setPrototypeOf(this, new.target.prototype);

    this.isOperational = true;
    this.httpCode = HttpCode.UNAUTHORIZED;

    Error.captureStackTrace(this);
  }
}
