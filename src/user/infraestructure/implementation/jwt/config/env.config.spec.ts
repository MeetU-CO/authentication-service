import jwtEnvConfig from './env.config';

describe('jwtEnvConfig', () => {
  const secretEnv = 'example secret';
  it('jwtEnvConfig should return the secret value', () => {
    process.env.JWT_SECRET = secretEnv;

    expect(jwtEnvConfig().secret).toStrictEqual(secretEnv);
  });
});
