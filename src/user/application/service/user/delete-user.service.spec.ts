import { SignupAuthDTO } from '../../../domain/dto/signup-auth.dto';
import { UnauthorizedException } from '../../../domain/exception/unauthorized.exception';
import { UserRepository } from '../../../domain/repository/user.repository';
import { DeleteUserService } from './delete-user.service';

describe('DeleteUserService', () => {
  const mockUserRepository: UserRepository = {
    add: jest.fn(async (user) => user),
    getByEmail: jest.fn(async (email) =>
      email === mockUserInDB.email ? mockUserInDB : null,
    ),
    deleteByEmail: jest.fn(async (email) => email === userEmailInDb),
  };

  const differentUser: SignupAuthDTO = {
    email: 'differentuser@example.com',
    name: 'different user',
  };

  const sameUser: SignupAuthDTO = {
    email: 'user@example.com',
    name: 'user',
  };

  const mockUserInDB = {
    email: sameUser.email,
    password: 'hashed',
    name: sameUser.name,
    isVerified: false,
    roles: [],
    notifications: [],
  };

  const userEmailInDb = sameUser.email;

  const deleteUserService = new DeleteUserService(mockUserRepository);

  it('DeleteUserService.run when given user is different from email throw UnauthorizedException', async () => {
    await expect(
      deleteUserService.run(differentUser, userEmailInDb),
    ).rejects.toThrow(UnauthorizedException);
  });

  it('DeleteUserService.run when given user who is same as email then deleteByEmail should be called', async () => {
    await deleteUserService.run(sameUser, userEmailInDb);
    expect(mockUserRepository.deleteByEmail).toBeCalled();
  });
});
