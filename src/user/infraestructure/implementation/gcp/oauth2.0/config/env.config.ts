import { registerAs } from '@nestjs/config';

const oauthGoogleEnvConfig = () => ({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_SECRET,
});

export default registerAs('google.oauth2', oauthGoogleEnvConfig);
