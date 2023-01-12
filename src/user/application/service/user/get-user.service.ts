import { UserNotFoundException } from '../../../domain/exception/user-not-found.exception';
import { User } from '../../../domain/repository/entity/user.entity';
import { UserRepository } from '../../../domain/repository/user.repository';

export class GetUserService {
  constructor(private readonly userRepository: UserRepository) {}

  async run(email: string): Promise<User> {
    const user = await this.userRepository.getByEmail(email);

    if (user === null) throw new UserNotFoundException();
    return user;
  }
}
