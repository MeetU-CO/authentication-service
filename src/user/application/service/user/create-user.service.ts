import { AlreadyUserExistsException } from 'src/user/domain/exception/already-user-exists.exception';
import { User } from 'src/user/domain/repository/entity/user.entity';
import { UserRepository } from 'src/user/domain/repository/user.repository';

export class CreateUserService {
  private readonly userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async run(body: User): Promise<User> {
    const existUser: boolean =
      (await this.userRepository.getByEmail(body.email)) !== null;
    if (existUser) {
      throw new AlreadyUserExistsException();
    }
    const userCreated: User = await this.userRepository.add(body);
    return userCreated;
  }
}
