import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { MongoUserRepository } from '../src/user/infraestructure/implementation/mongodb/repository/mongo-user.repository';
import { UserRepository } from '../src/user/domain/repository/user.repository';
import { UserModel } from '../src/user/infraestructure/implementation/mongodb/repository/model/user.model';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { HttpCode } from '../src/user/domain/repository/entity/http-code.entity';

describe('AuthController (e2e)', () => {
  let app: INestApplication;

  let mongoRepository: UserRepository;

  const newUser = {
    email: 'exampleemail@test.com',
    password: 'examplePassword12345',
    name: 'example user',
  };

  const loginUser = {
    email: 'exampleemail@test.com',
    password: 'examplePassword12345',
  };

  let bearerToken = '';

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
      providers: [
        MongoUserRepository,
        UserModel,
        { provide: getModelToken(UserModel.name), useValue: Model },
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    mongoRepository =
      moduleFixture.get<MongoUserRepository>(MongoUserRepository);
  });

  afterAll(async () => {
    await mongoRepository.deleteByEmail(newUser.email);
    await app.close();
  });

  it('/auth/signup (POST)', async () => {
    const res = await request(app.getHttpServer())
      .post('/auth/signup')
      .send(newUser);

    expect(res.statusCode).toEqual(HttpCode.CREATED);
    expect(res.body).toHaveProperty('email');
    expect(res.body).toHaveProperty('name');
    expect(res.body).toHaveProperty('roles');
    expect(res.body).toHaveProperty('notifications');
    expect(res.body).toHaveProperty('token');
  });

  it('/auth/login (POST)', async () => {
    const res = await request(app.getHttpServer())
      .post('/auth/login')
      .send(loginUser);

    expect(res.statusCode).toEqual(HttpCode.OK);
    expect(res.body).toHaveProperty('email');
    expect(res.body).toHaveProperty('name');
    expect(res.body).toHaveProperty('roles');
    expect(res.body).toHaveProperty('notifications');
    expect(res.body).toHaveProperty('token');

    bearerToken = res.body.token;
  });

  it('/auth/:email (DELETE)', async () => {
    const res = await request(app.getHttpServer())
      .delete(`/auth/${newUser.email}`)
      .set('Authorization', `Bearer ${bearerToken}`);

    expect(res.statusCode).toEqual(HttpCode.OK);
    expect(res.body).toEqual({});

    bearerToken = res.body.token;
  });
});
