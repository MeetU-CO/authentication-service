import oauthMicrosoftEnvConfig from './env.config';

describe('oauthMicrosoftEnvConfig', () => {
  beforeEach(() => {
    jest.resetModules();
  });

  it('should return the OAuth Microsoft env parameters', () => {
    process.env.MICROSOFT_CLIENT_ID = '0000000000';
    process.env.MICROSOFT_SECRET = 'secret-microsoft';

    const config = oauthMicrosoftEnvConfig();
    expect(config).toEqual({
      clientID: '0000000000',
      clientSecret: 'secret-microsoft',
    });
  });
});
