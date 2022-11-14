import { AuthResponseDTO } from 'src/user/domain/dto/auth-response.dto';
import { LoginAuthDTO } from 'src/user/domain/dto/login-auth.dto';
import { WrongPasswordOrEmailException } from 'src/user/domain/exception/wrong-password-email.exception';
import { UserRepository } from 'src/user/domain/repository/user.repository';
import { PasswordEncrypter } from 'src/user/domain/utils/encrypter';
import { GetUserService } from '../user/get-user.service';

export class LoginAuthService {
  private readonly passwordEncrypter: PasswordEncrypter;
  private readonly getUserService: GetUserService;

  constructor(
    passwordEncrypter: PasswordEncrypter,
    userRepository: UserRepository,
  ) {
    this.passwordEncrypter = passwordEncrypter;
    this.getUserService = new GetUserService(userRepository);
  }

  async run(loginAuthDTO: LoginAuthDTO): Promise<AuthResponseDTO> {
    const user = await this.getUserService.run(loginAuthDTO.email);

    const isLogged = await this.passwordEncrypter.compare(
      loginAuthDTO.password,
      user.password ?? '',
    );

    if (!isLogged) throw new WrongPasswordOrEmailException();

    return {
      email: user.email,
      name: user.name,
      roles: user.roles,
      notifications: user.notifications,
    };
  }
}
