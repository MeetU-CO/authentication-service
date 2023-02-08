import { Controller, Post, Body, UseGuards, Get, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { JwtService } from '@nestjs/jwt';
import { SignupAuthDTOValidation } from '../validation/dto/signup-auth.validation.dto';
import { LoginAuthDTOValidation } from '../validation/dto/login-auth.validation.dto';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { SignupAuthDTO } from '../../domain/dto/signup-auth.dto';
import { Delete, HttpCode, Param, Redirect } from '@nestjs/common/decorators';
import { HttpCode as HttpCodes } from '../../domain/repository/entity/http-code.entity';
import { ConfigService } from '@nestjs/config';

@ApiTags('authentication')
@Controller('auth')
export class AuthController {
  private frontUrl: string;
  constructor(
    private readonly userService: UserService,
    private jwtAuthService: JwtService,
    configService: ConfigService,
  ) {
    this.frontUrl = configService.get<string>('server.frontEndUrl') as string;
  }

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
  @HttpCode(HttpCodes.OK)
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
  @Redirect(`http://localhost:3000/auth-callback`)
  async googleAuthRedirect(@Req() req: Request) {
    const user = await this.userService.oauthLogin(req.user as SignupAuthDTO);
    const payload = {
      email: user.email,
      name: user.name,
      roles: user.roles ?? [],
    };
    const token = await this.jwtAuthService.signAsync(payload);

    const url = new URL(this.frontUrl);
    url.pathname = '/auth-callback';
    url.searchParams.set('token', token);

    return { url: url.href };
  }

  @Get('microsoft')
  @UseGuards(AuthGuard('azure-ad'))
  async microsoftLogin(@Req() _req: Request): Promise<any> {
    return;
  }

  @Get('microsoft/redirect')
  @UseGuards(AuthGuard('azure-ad'))
  @Redirect(`http://localhost:3000/auth-callback`)
  async microsoftAuthRedirect(@Req() req: Request) {
    const user = await this.userService.oauthLogin(req.user as SignupAuthDTO);
    const payload = {
      email: user.email,
      name: user.name,
      roles: user.roles ?? [],
    };
    const token = await this.jwtAuthService.signAsync(payload);
    const url = new URL(this.frontUrl);
    url.pathname = '/auth-callback';
    url.searchParams.set('token', token);

    return { url: url.href };
  }

  @Delete(':email')
  @UseGuards(AuthGuard('jwt'))
  async deleteUser(@Param('email') email: string, @Req() req: Request) {
    return await this.userService.deleteUser(req.user as SignupAuthDTO, email);
  }
}
