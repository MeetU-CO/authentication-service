import { UserNotFoundException } from '../../../domain/exception/user-not-found.exception';
import { GetUserService } from './get-user.service';

describe('GetUserService', () => {
  const mockUserRepository = {
    add: jest.fn(async (user) => user),
    getByEmail: jest.fn(async (email) =>
      email === mockUserInDB.email ? mockUserInDB : null,
    ),
    deleteByEmail: jest.fn(async (email) => true),
  };
  const mockUserInDB = {
    email: 'user@example.com',
    password: 'hashed',
    name: 'user',
    isVerified: false,
    roles: [],
    notifications: [],
  };

  const emailFromNone = 'none@example.com';

  const getUserService: GetUserService = new GetUserService(mockUserRepository);

  test('GetUserService execute UserRepository.getByEmail', async () => {
    await getUserService.run(mockUserInDB.email);
    expect(mockUserRepository.getByEmail).toHaveBeenCalled();
  });

  test('GetUserService should return user when is found', async () => {
    expect(await getUserService.run(mockUserInDB.email)).toStrictEqual(
      mockUserInDB,
    );
  });

  test('GetUserService should throw UserNotFoundException when is not found', async () => {
    await expect(getUserService.run(emailFromNone)).rejects.toThrow(
      UserNotFoundException,
    );
  });
});
