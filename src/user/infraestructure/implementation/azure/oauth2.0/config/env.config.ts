import { registerAs } from '@nestjs/config';

const oauthMicrosoftEnvConfig = () => ({
  clientID: process.env.MICROSOFT_CLIENT_ID,
  clientSecret: process.env.MICROSOFT_SECRET,
});

export default registerAs('microsoft.oauth2', oauthMicrosoftEnvConfig);
