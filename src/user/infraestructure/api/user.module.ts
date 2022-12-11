import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserService } from './user.service';
import { AuthController } from './auth.controller';
import {
  UserModel,
  UserSchema,
} from '../implementation/mongodb/repository/model/user.model';
import { MongoUserRepository } from '../implementation/mongodb/repository/mongo-user.repository';
import { Encrypter } from '../implementation/encrypter/bcrypjs.encrypter';
import { JwtModule } from '@nestjs/jwt';
import { GoogleStrategy } from '../common/strategy/google.strategy';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: UserModel.name,
        schema: UserSchema,
      },
    ]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '30m' },
    }),
  ],
  controllers: [AuthController],
  providers: [UserService, MongoUserRepository, Encrypter, GoogleStrategy],
})
export class UserModule {}
