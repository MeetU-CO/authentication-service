import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { UserService } from './user.service';

describe('AuthController', () => {
  let controller: AuthController;

  jest
    .spyOn(JwtService.prototype, 'signAsync')
    .mockImplementation(async () => 'example of token');

  const authResponseExpected = {
    token: 'example of token',
    email: 'user@example.com',
    name: 'user',
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

  const mockUserService = {
    login: jest.fn(async () => authResponseDTO),
    signup: jest.fn(async () => authResponseDTO),
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
});
