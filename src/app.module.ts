import { Module } from '@nestjs/common';
import { UserModule } from './user/infraestructure/api/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { MongooseConfigService } from './user/infraestructure/implementation/mongodb/config';
import { ConfigModule } from '@nestjs/config';
import mongoEnvConfig from './user/infraestructure/implementation/mongodb/config/env.config';
import jwtEnvConfig from './user/infraestructure/implementation/jwt/config/env.config';
import oauthGoogleEnvConfig from './user/infraestructure/implementation/gcp/oauth2.0/config/env.config';
import serverEnvConfig from './user/infraestructure/config/server/env.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [
        serverEnvConfig,
        mongoEnvConfig,
        jwtEnvConfig,
        oauthGoogleEnvConfig,
      ],
      cache: true,
    }),
    MongooseModule.forRootAsync({
      useClass: MongooseConfigService,
    }),
    UserModule,
  ],
})
export class AppModule {}
