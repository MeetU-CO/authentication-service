import { SignupAuthService } from './signup-auth.service';
import { CreateUserService } from '../user/create-user.service';

describe('SignupAuthService', () => {
  const createUserServiceMock = jest
    .spyOn(CreateUserService.prototype, 'run')
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
      email === mockUserInDB.email ? mockUserInDB : null,
    ),
  };

  const signupAuthService: SignupAuthService = new SignupAuthService(
    mockEncrypter,
    mockUserRepository,
  );

  const authResponseDTOMock = {
    email: 'user@example.com',
    name: 'user',
    roles: [],
    notifications: [],
  };

  const mockSignupAuthDTO = {
    email: 'user@example.com',
    password: 'hashed',
    name: 'user',
  };
  const mockSignupAuthDTOWithoutPassword = {
    ...mockSignupAuthDTO,
    password: undefined,
  };

  test('SignupAuthService execute CreateUserService.run', async () => {
    await signupAuthService.run(mockSignupAuthDTO);
    expect(createUserServiceMock).toHaveBeenCalled();
  });

  test('SignupAuthService should return AuthResponseDTO when signup is successful', async () => {
    expect(await signupAuthService.run(mockSignupAuthDTO)).toStrictEqual(
      authResponseDTOMock,
    );
  });

  test('SignupAuthService should return AuthResponseDTO when signup is successful and password is null', async () => {
    expect(
      await signupAuthService.run(mockSignupAuthDTOWithoutPassword),
    ).toStrictEqual(authResponseDTOMock);
  });
});
