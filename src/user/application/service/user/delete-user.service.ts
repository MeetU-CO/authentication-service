import { UserRepository } from 'src/user/domain/repository/user.repository';
import { SignupAuthDTO } from '../../../domain/dto/signup-auth.dto';
import { UnauthorizedException } from '../../../domain/exception/unauthorized.exception';

export class DeleteUserService {
  constructor(private readonly userRepository: UserRepository) {}

  async run(user: SignupAuthDTO, email: string) {
    if (user.email !== email) throw new UnauthorizedException();
    await this.userRepository.deleteByEmail(email);
  }
}
