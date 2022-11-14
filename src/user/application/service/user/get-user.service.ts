import { UserNotFoundException } from 'src/user/domain/exception/user-not-found.exception';
import { User } from 'src/user/domain/repository/entity/user.entity';
import { UserRepository } from 'src/user/domain/repository/user.repository';

export class GetUserService {
  constructor(private readonly userRepository: UserRepository) {}

  async run(email: string): Promise<User> {
    const user = await this.userRepository.getByEmail(email);

    if (user === null) throw new UserNotFoundException();
    return user;
  }
}
