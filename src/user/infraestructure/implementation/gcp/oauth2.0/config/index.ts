import { Injectable } from '@nestjs/common/decorators';
import { ConfigService } from '@nestjs/config';
import { MissingEnvVariablesException } from '../../../../../domain/exception/missing-env-variables.exception';
import throwExpression from '../../../../../domain/utils/throw-expression';
import { GoogleOauthOptions } from './parameter.config';

@Injectable()
export class GoogleOauthConfigService {
  private static oauthOptions: GoogleOauthOptions;
  constructor(private configService: ConfigService) {
    GoogleOauthConfigService.oauthOptions ?? this.createOauthOptions();
  }

  createOauthOptions(): GoogleOauthOptions {
    GoogleOauthConfigService.oauthOptions = {
      clientID:
        this.configService.get<string>('google.oauth2.clientID') ??
        throwExpression(
          new MissingEnvVariablesException('Google Oauth2.0 clientID'),
        ),
      clientSecret:
        this.configService.get<string>('google.oauth2.clientSecret') ??
        throwExpression(
          new MissingEnvVariablesException('Google Oauth2.0 clientSecret'),
        ),
      callbackURL: `http://localhost:${this.configService.get<string>(
        'server.port',
      )}/auth/google/redirect`,
      scope: ['email', 'profile'],
    };

    return this.getOauthOptions();
  }

  getOauthOptions(): GoogleOauthOptions {
    return GoogleOauthConfigService.oauthOptions;
  }
}
