import { SignupAuthDTO } from '../../../domain/dto/signup-auth.dto';
import { UnauthorizedException } from '../../../domain/exception/unauthorized.exception';
import { UserRepository } from '../../../domain/repository/user.repository';

export class DeleteUserService {
  constructor(private readonly userRepository: UserRepository) {}

  async run(user: SignupAuthDTO, email: string) {
    if (user.email !== email) throw new UnauthorizedException();
    await this.userRepository.deleteByEmail(email);
  }
}
