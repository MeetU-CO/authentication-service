import { LoginAuthService } from './login-auth.service';
import { GetUserService } from '../user/get-user.service';
import { WrongPasswordOrEmailException } from '../../../domain/exception/wrong-password-email.exception';

describe('LoginAuthService', () => {
  const getUserServiceMock = jest
    .spyOn(GetUserService.prototype, 'run')
    .mockImplementation(async () => mockUserInDB);

  const mockEncrypter = {
    compare: jest.fn(async (password, hash) => password === hash),
    encrypt: jest.fn(async (password) => password),
  };

  const mockUserInDB = {
    email: 'user@example.com',
    password: 'hashed',
    name: 'user',
    isVerified: false,
    roles: [],
    notifications: [],
  };
  const mockUserRepository = {
    add: jest.fn(async (user) => user),
    getByEmail: jest.fn(async (email) =>
      email === mockUserInDB ? mockUserInDB : null,
    ),
    deleteByEmail: jest.fn(async (_email) => true),
  };

  const loginAuthService: LoginAuthService = new LoginAuthService(
    mockEncrypter,
    mockUserRepository,
  );

  const mockAuthDTOSuccessful = {
    email: 'user@example.com',
    password: 'hashed',
  };

  const mockAuthDTOFailed = {
    email: 'user@example.com',
    password: 'other',
  };

  const authResponseDTOMock = {
    email: 'user@example.com',
    name: 'user',
    roles: [],
    notifications: [],
  };

  test('LoginAuthService execute GetUserService.run', async () => {
    await loginAuthService.run(mockAuthDTOSuccessful);
    expect(getUserServiceMock).toHaveBeenCalled();
  });

  test('LoginAuthService should return AuthResponseDTO when login is successful', async () => {
    expect(await loginAuthService.run(mockAuthDTOSuccessful)).toStrictEqual(
      authResponseDTOMock,
    );
  });

  test('LoginAuthService should throw WrongPasswordOrEmailException when login is not successful', async () => {
    await expect(loginAuthService.run(mockAuthDTOFailed)).rejects.toThrow(
      WrongPasswordOrEmailException,
    );
  });
});
