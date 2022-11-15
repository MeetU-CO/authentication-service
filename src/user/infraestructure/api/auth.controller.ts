import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { JwtService } from '@nestjs/jwt';
import { SignupAuthDTOValidation } from '../validation/dto/signup-auth.validation.dto';
import { LoginAuthDTOValidation } from '../validation/dto/login-auth.validation.dto';

@ApiTags('authentication')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private jwtAuthService: JwtService,
  ) {}

  @Post('signup')
  async signup(@Body() signupAuthDTO: SignupAuthDTOValidation) {
    const userCreated = await this.userService.signup(signupAuthDTO);
    const payload = {
      email: userCreated.email,
      name: userCreated.name,
      roles: userCreated.roles ?? [],
    };
    const token = await this.jwtAuthService.signAsync(payload);
    return { ...userCreated, token };
  }

  @Post('login')
  async login(@Body() loginAuthDTO: LoginAuthDTOValidation) {
    const userLogged = await this.userService.login(loginAuthDTO);
    const payload = {
      email: userLogged.email,
      name: userLogged.name,
      roles: userLogged.roles ?? [],
    };
    const token = await this.jwtAuthService.signAsync(payload);
    return { ...userLogged, token };
  }
}
