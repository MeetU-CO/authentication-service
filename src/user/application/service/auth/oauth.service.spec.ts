import { OauthService } from './oauth.service';

describe('OauthService', () => {
  const mockUserInDB = {
    email: 'user@example.com',
    password: 'hashed',
    name: 'user',
    isVerified: false,
    roles: [],
    notifications: [],
  };
  const mockUserRepository = {
    add: jest.fn(async (user) => {
      return { ...user, notifications: [], roles: [] };
    }),
    getByEmail: jest.fn(async (email) =>
      email === mockUserInDB.email ? mockUserInDB : null,
    ),
  };

  const oauthService: OauthService = new OauthService(mockUserRepository);

  const authResponseDTOMock = {
    email: 'user@example.com',
    name: 'user',
    roles: [],
    notifications: [],
  };

  const mockAlreadyExistsAuthDTO = {
    email: 'user@example.com',
    password: 'hashed',
    name: 'user',
  };

  const mockNewUserAuthDTO = {
    email: 'user2@example.com',
    password: 'hashed',
    name: 'user',
  };

  const authResponseDTOMockNewUser = {
    email: 'user2@example.com',
    name: 'user',
    roles: [],
    notifications: [],
  };

  test('oauthService get user by email then return the authResponse', async () => {
    expect(await oauthService.run(mockAlreadyExistsAuthDTO)).toStrictEqual(
      authResponseDTOMock,
    );
  });

  test('oauthService create the user if it is not already created then return the authResponse', async () => {
    expect(await oauthService.run(mockNewUserAuthDTO)).toStrictEqual(
      authResponseDTOMockNewUser,
    );
  });
});
