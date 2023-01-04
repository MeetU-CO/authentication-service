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
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { GoogleStrategy } from '../common/strategy/google.strategy';
import { MicrosoftStrategy } from '../common/strategy/microsoft.strategy';
import { JwtStrategy } from '../common/strategy/jwt.strategy';
import { JwtConfigService } from '../implementation/jwt/config';
import { GoogleOauthConfigService } from '../implementation/gcp/oauth2.0/config';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: UserModel.name,
        schema: UserSchema,
      },
    ]),
    PassportModule,
    JwtModule.registerAsync({
      useClass: JwtConfigService,
    }),
  ],
  controllers: [AuthController],
  providers: [
    JwtConfigService,
    GoogleOauthConfigService,
    UserService,
    MongoUserRepository,
    Encrypter,
    GoogleStrategy,
    MicrosoftStrategy,
    JwtStrategy,
  ],
})
export class UserModule {}
