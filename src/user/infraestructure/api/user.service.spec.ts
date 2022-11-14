import { Test, TestingModule } from '@nestjs/testing';
import { LoginAuthService } from 'src/user/application/service/auth/login-auth.service';
import { SignupAuthService } from 'src/user/application/service/auth/signup-auth.service';
import { Encrypter } from '../implementation/encrypter/bcrypjs.encrypter';
import { MongoUserRepository } from '../implementation/mongodb/repository/mongo-user.repository';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;

  jest.mock('../implementation/encrypter/bcrypjs.encrypter');

  const mockMongoUserRepository = {
    add: async () => '',
    getByEmail: async () => '',
  };

  const authResponseDTO = {
    email: 'user@example.com',
    name: 'user',
  };

  const signupDTO = {
    email: 'user@example.com',
    name: 'user',
  };

  const loginDTO = {
    email: 'user@example.com',
    password: 'password',
  };

  jest
    .spyOn(LoginAuthService.prototype, 'run')
    .mockImplementation(async () => authResponseDTO);

  jest
    .spyOn(SignupAuthService.prototype, 'run')
    .mockImplementation(async () => authResponseDTO);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        Encrypter,
        {
          provide: MongoUserRepository,
          useValue: mockMongoUserRepository,
        },
        UserService,
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  test('UserService should return authResponse when signup is successful', async () => {
    expect(await service.signup(signupDTO)).toStrictEqual(authResponseDTO);
  });

  test('UserService should return authResponse when login is successful', async () => {
    expect(await service.login(loginDTO)).toStrictEqual(authResponseDTO);
  });
});
