import { AuthResponseDTO } from '../../../domain/dto/auth-response.dto';
import { SignupAuthDTO } from '../../../domain/dto/signup-auth.dto';
import { UserRepository } from '../../../domain/repository/user.repository';

export class OauthService {
  private readonly userRepository: UserRepository;
  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async run(userDTO: SignupAuthDTO): Promise<AuthResponseDTO> {
    const userInDB = await this.userRepository.getByEmail(userDTO.email);

    if (userInDB)
      return {
        email: userInDB.email,
        name: userInDB.name,
        roles: userInDB.roles,
        notifications: userInDB.notifications,
      };

    const newUser = await this.userRepository.add({
      ...userDTO,
      isVerified: false,
    });

    return {
      email: newUser.email,
      name: newUser.name,
      roles: newUser.roles,
      notifications: newUser.notifications,
    };
  }
}
