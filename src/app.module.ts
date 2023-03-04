import { Module } from '@nestjs/common';
import { UserModule } from './user/infraestructure/api/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { MongooseConfigService } from './user/infraestructure/implementation/mongodb/config';
import { ConfigModule, ConfigService } from '@nestjs/config';
import mongoEnvConfig from './user/infraestructure/implementation/mongodb/config/env.config';
import jwtEnvConfig from './user/infraestructure/implementation/jwt/config/env.config';
import oauthGoogleEnvConfig from './user/infraestructure/implementation/gcp/oauth2.0/config/env.config';
import serverEnvConfig from './user/infraestructure/config/server/env.config';
import oauthMicrosoftEnvConfig from './user/infraestructure/implementation/azure/oauth2.0/config/env.config';
import { LoggerModule } from 'nestjs-pino';
import { ConsoleTransport } from './user/infraestructure/implementation/logger/consoleTransport.logger';
import { GrafanaTransport } from './user/infraestructure/implementation/logger/grafanaTransport.logger';
import { TransportLogger } from './user/domain/utils/logger';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [
        serverEnvConfig,
        mongoEnvConfig,
        jwtEnvConfig,
        oauthGoogleEnvConfig,
        oauthMicrosoftEnvConfig,
      ],
      cache: true,
    }),
    LoggerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const transport: TransportLogger =
          process.env.NODE_ENV === 'production'
            ? new GrafanaTransport(
                configService.get<string>('GRAFANA_LOGGING_API_KEY') as string,
              )
            : new ConsoleTransport();
        return {
          pinoHttp: {
            customProps: (_req, _res) => ({
              context: 'HTTP',
            }),
            transport: transport.createTranport(),
          },
        };
      },
    }),
    MongooseModule.forRootAsync({
      useClass: MongooseConfigService,
    }),
    UserModule,
  ],
})
export class AppModule {}
