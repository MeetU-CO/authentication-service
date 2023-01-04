import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-microsoft';
import { MicrosoftOauthConfigService } from '../../implementation/azure/oauth2.0/config';

@Injectable()
export class MicrosoftStrategy extends PassportStrategy(Strategy, 'azure-ad') {
  constructor(microsoftConfig: MicrosoftOauthConfigService) {
    super(microsoftConfig.getOauthOptions());
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: (err: any, user: any) => void,
  ): Promise<any> {
    const { name, emails } = profile;
    const user = {
      email: emails[0].value,
      name: `${name.givenName} ${name.familyName ?? ''}`,
      accessToken,
    };
    done(null, user);
  }
}
