import { AuthResponseDTO } from '../../../domain/dto/auth-response.dto';
import { SignupAuthDTO } from '../../../domain/dto/signup-auth.dto';
import { UserRepository } from '../../../domain/repository/user.repository';
import { PasswordEncrypter } from '../../../domain/utils/encrypter';
import { CreateUserService } from '../user/create-user.service';

export class SignupAuthService {
  private readonly passwordEncrypter: PasswordEncrypter;
  private readonly createUserService: CreateUserService;
  constructor(
    passwordEncrypter: PasswordEncrypter,
    userRepository: UserRepository,
  ) {
    this.passwordEncrypter = passwordEncrypter;
    this.createUserService = new CreateUserService(userRepository);
  }

  async run(userDTO: SignupAuthDTO): Promise<AuthResponseDTO> {
    const userWithPasswordEncryped: SignupAuthDTO = {
      ...userDTO,
      password: userDTO.password
        ? await this.passwordEncrypter.encrypt(userDTO.password)
        : undefined,
    };

    const userCreated = await this.createUserService.run({
      ...userWithPasswordEncryped,
      isVerified: false,
    });

    return {
      email: userCreated.email,
      name: userCreated.name,
      roles: userCreated.roles,
      notifications: userCreated.notifications,
    };
  }
}
