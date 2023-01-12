import { AlreadyUserExistsException } from '../../../domain/exception/already-user-exists.exception';
import { CreateUserService } from './create-user.service';

describe('CreateUserService', () => {
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

  const userNotInDB = {
    email: 'user2@example.com',
    password: 'hashed',
    name: 'user2',
    isVerified: false,
  };

  const createUserService: CreateUserService = new CreateUserService(
    mockUserRepository,
  );

  test('CreateUserService execute UserRepository.getByEmail', async () => {
    await createUserService.run(userNotInDB);
    expect(mockUserRepository.getByEmail).toHaveBeenCalled();
  });

  test('CreateUserService execute UserRepository.add', async () => {
    await createUserService.run(userNotInDB);
    expect(mockUserRepository.add).toHaveBeenCalled();
  });

  test('CreateUserService should return User when is not in DB', async () => {
    expect(await createUserService.run(userNotInDB)).toStrictEqual(userNotInDB);
  });

  test('CreateUserService should throw AlreadyUserExistsException when user already exists', async () => {
    await expect(createUserService.run(mockUserInDB)).rejects.toThrow(
      AlreadyUserExistsException,
    );
  });
});
