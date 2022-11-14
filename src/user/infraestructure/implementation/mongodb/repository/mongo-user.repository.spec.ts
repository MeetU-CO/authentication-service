import { getModelToken } from '@nestjs/mongoose';
import { Test } from '@nestjs/testing';
import { UserModel } from './model/user.model';
import { MongoUserRepository } from './mongo-user.repository';

describe('MongoUserRepository', () => {
  let userRepository: MongoUserRepository;

  const mockUser = {
    email: 'user@example.com',
    password: 'hashed',
    name: 'user',
    isVerified: false,
    roles: [],
    notifications: [],
  };

  const mockUserModel = {
    create: jest.fn(async () => mockUser),
    findOne: jest.fn(() => {
      return {
        exec: async () => mockUser,
      };
    }),
  };

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        MongoUserRepository,
        {
          provide: getModelToken(UserModel.name),
          useValue: mockUserModel,
        },
      ],
    }).compile();

    userRepository = moduleRef.get<MongoUserRepository>(MongoUserRepository);

    jest.clearAllMocks();
  });

  test('MongoUserRepository execute UserModel.create', async () => {
    await userRepository.add(mockUser);
    expect(mockUserModel.create).toHaveBeenCalled();
  });

  test('MongoUserRepository execute UserModel.findOne', async () => {
    await userRepository.getByEmail(mockUser.email);
    expect(mockUserModel.findOne).toHaveBeenCalled();
  });

  test('MongoUserRepository should return user when add new user', async () => {
    expect(await userRepository.add(mockUser)).toStrictEqual(mockUser);
  });

  test('MongoUserRepository should return user when look for a new user', async () => {
    expect(await userRepository.getByEmail(mockUser.email)).toStrictEqual(
      mockUser,
    );
  });
});
