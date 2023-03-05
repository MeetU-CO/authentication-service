import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { UserService } from './user.service';
import { ConfigService } from '@nestjs/config';

describe('AuthController', () => {
  let controller: AuthController;

  jest
    .spyOn(ConfigService.prototype, 'get')
    .mockImplementation((_param: string) => frontEndUrl);

  jest
    .spyOn(JwtService.prototype, 'signAsync')
    .mockImplementation(async () => 'example of token');

  const authResponseExpected = {
    token: 'example of token',
    email: 'user@example.com',
    name: 'user',
  };

  const frontEndUrl = 'http://localhost:3000';
  const tokenUriEncoded = authResponseExpected.token.split(' ').join('+');
  const oauthResponseExpected = {
    url: `${frontEndUrl}/auth-callback?token=${tokenUriEncoded}`,
  };

  const authResponseDTO = {
    email: 'user@example.com',
    name: 'user',
  };

  const loginAuthDTO = {
    email: 'user@example.com',
    password: 'password',
  };

  const signupAuthDTO = {
    email: 'user@example.com',
    password: 'password',
    name: 'user',
  };

  const requestMockUser = {
    user: {},
  };

  const mockUserService = {
    login: jest.fn(async () => authResponseDTO),
    signup: jest.fn(async () => authResponseDTO),
    oauthLogin: jest.fn(async () => authResponseDTO),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        JwtService,
        {
          provide: UserService,
          useValue: mockUserService,
        },
        ConfigService,
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  test('AuthController should return authResponse when signup is successful', async () => {
    expect(await controller.signup(signupAuthDTO)).toStrictEqual(
      authResponseExpected,
    );
  });

  test('AuthController should return authResponse when login is successful', async () => {
    expect(await controller.login(loginAuthDTO)).toStrictEqual(
      authResponseExpected,
    );
  });

  test('AuthController should return null when googleLogin is successful', async () => {
    expect(await controller.googleLogin(null as any)).toStrictEqual(undefined);
  });

  test('AuthController should return null when microsoftLogin is successful', async () => {
    expect(await controller.microsoftLogin(null as any)).toStrictEqual(
      undefined,
    );
  });

  test('AuthController should return authResponse when googleAuthRedirect is successful', async () => {
    expect(
      await controller.googleAuthRedirect(requestMockUser as any),
    ).toStrictEqual(oauthResponseExpected);
  });

  test('AuthController should return authResponse when microsoftAuthRedirect is successful', async () => {
    expect(
      await controller.microsoftAuthRedirect(requestMockUser as any),
    ).toStrictEqual(oauthResponseExpected);
  });
});
