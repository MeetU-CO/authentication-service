import { Injectable } from '@nestjs/common';

import { LoginAuthService } from '../../application/service/auth/login-auth.service';
import { OauthService } from '../../application/service/auth/oauth.service';
import { SignupAuthService } from '../../application/service/auth/signup-auth.service';
import { DeleteUserService } from '../../application/service/user/delete-user.service';
import { LoginAuthDTO } from '../../domain/dto/login-auth.dto';
import { SignupAuthDTO } from '../../domain/dto/signup-auth.dto';
import { UserNotFoundException } from '../../domain/exception/user-not-found.exception';
import { Encrypter } from '../implementation/encrypter/bcrypjs.encrypter';
import { MongoUserRepository } from '../implementation/mongodb/repository/mongo-user.repository';

@Injectable()
export class UserService {
  private signupService: SignupAuthService;
  private loginService: LoginAuthService;
  private oauthService: OauthService;
  private deleteUserService: DeleteUserService;
  constructor(userRepository: MongoUserRepository, encrypter: Encrypter) {
    this.signupService = new SignupAuthService(encrypter, userRepository);
    this.loginService = new LoginAuthService(encrypter, userRepository);
    this.oauthService = new OauthService(userRepository);
    this.deleteUserService = new DeleteUserService(userRepository);
  }
  signup(signupAuthDTO: SignupAuthDTO) {
    return this.signupService.run(signupAuthDTO);
  }

  login(loginAuthDTO: LoginAuthDTO) {
    return this.loginService.run(loginAuthDTO);
  }

  oauthLogin(authDTO?: SignupAuthDTO) {
    if (!authDTO) throw new UserNotFoundException();
    return this.oauthService.run(authDTO);
  }

  deleteUser(user: SignupAuthDTO, email: string) {
    return this.deleteUserService.run(user, email);
  }
}
