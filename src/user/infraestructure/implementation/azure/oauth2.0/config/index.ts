import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MissingEnvVariablesException } from '../../../../../domain/exception/missing-env-variables.exception';
import throwExpression from '../../../../../domain/utils/throw-expression';
import { MicrosoftOauthOptions } from './parameter.config';

@Injectable()
export class MicrosoftOauthConfigService {
  private static oauthOptions: MicrosoftOauthOptions;
  constructor(private configService: ConfigService) {
    MicrosoftOauthConfigService.oauthOptions ?? this.createOauthOptions();
  }
  createOauthOptions(): MicrosoftOauthOptions {
    MicrosoftOauthConfigService.oauthOptions = {
      clientID:
        this.configService.get<string>('microsoft.oauth2.clientID') ??
        throwExpression(
          new MissingEnvVariablesException('Microsoft Oauth2.0 clientID'),
        ),
      clientSecret:
        this.configService.get<string>('microsoft.oauth2.clientSecret') ??
        throwExpression(
          new MissingEnvVariablesException('Microsoft Oauth2.0 clientSecret'),
        ),
      callbackURL: `http://localhost:${this.configService.get<string>(
        'server.port',
      )}/auth/microsoft/redirect`,
      scope: ['user.read'],
    };

    return this.getOauthOptions();
  }

  getOauthOptions(): MicrosoftOauthOptions {
    return MicrosoftOauthConfigService.oauthOptions;
  }
}
