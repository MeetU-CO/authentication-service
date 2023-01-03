import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { GoogleOauthConfigService } from '../../implementation/gcp/oauth2.0/config';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(googleConfig: GoogleOauthConfigService) {
    super(googleConfig.getOauthOptions());
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<any> {
    const { name, emails, photos } = profile;
    const user = {
      email: emails[0].value,
      name: `${name.givenName} ${name.familyName ?? ''}`,
      picture: photos[0].value,
      accessToken,
    };
    done(null, user);
  }
}
