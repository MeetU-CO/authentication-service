import { Controller, Post, Body, UseGuards, Get, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { JwtService } from '@nestjs/jwt';
import { SignupAuthDTOValidation } from '../validation/dto/signup-auth.validation.dto';
import { LoginAuthDTOValidation } from '../validation/dto/login-auth.validation.dto';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { SignupAuthDTO } from '../../domain/dto/signup-auth.dto';

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

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleLogin(@Req() _req: Request): Promise<any> {
    return;
  }

  @Get('google/redirect')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req: Request) {
    const user = await this.userService.oauthLogin(req.user as SignupAuthDTO);
    const payload = {
      email: user.email,
      name: user.name,
      roles: user.roles ?? [],
    };
    const token = await this.jwtAuthService.signAsync(payload);
    return { ...user, token };
  }
}
