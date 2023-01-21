import oauthGoogleEnvConfig from './env.config';

describe('oauthGoogleEnvConfig', () => {
  beforeEach(() => {
    jest.resetModules();
  });

  it('should return the OAuth Google env parameters', () => {
    process.env.GOOGLE_CLIENT_ID = '0000000000';
    process.env.GOOGLE_SECRET = 'secret-google';

    const config = oauthGoogleEnvConfig();
    expect(config).toEqual({
      clientID: '0000000000',
      clientSecret: 'secret-google',
    });
  });
});
