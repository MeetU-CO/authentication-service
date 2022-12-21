import { Injectable } from '@nestjs/common';
import { LoginAuthService } from 'src/user/application/service/auth/login-auth.service';
import { SignupAuthService } from 'src/user/application/service/auth/signup-auth.service';
import { LoginAuthDTO } from 'src/user/domain/dto/login-auth.dto';
import { SignupAuthDTO } from 'src/user/domain/dto/signup-auth.dto';
import { OauthService } from '../../application/service/auth/oauth.service';
import { UserNotFoundException } from '../../domain/exception/user-not-found.exception';
import { Encrypter } from '../implementation/encrypter/bcrypjs.encrypter';
import { MongoUserRepository } from '../implementation/mongodb/repository/mongo-user.repository';

@Injectable()
export class UserService {
  private signupService: SignupAuthService;
  private loginService: LoginAuthService;
  private oauthService: OauthService;
  constructor(userRepository: MongoUserRepository, encrypter: Encrypter) {
    this.signupService = new SignupAuthService(encrypter, userRepository);
    this.loginService = new LoginAuthService(encrypter, userRepository);
    this.oauthService = new OauthService(userRepository);
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
}
